import logging
from multiprocessing.dummy import Array
from datetime import datetime, timedelta, timezone
from re import A
from flask import Flask, redirect, url_for, render_template, request, flash, jsonify, json
from werkzeug.exceptions import HTTPException
import pandas as pd
from sklearn import preprocessing
import numpy as np
import json
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from flask_cors import CORS, cross_origin
import sys

logging.basicConfig(level=logging.INFO,
                    datefmt='%Y-%m-%d %H:%M:%S',
                    format="%(asctime)s [%(name)-12.12s] [%(levelname)-5.5s] %(filename)s %(lineno)s %(message)s")

VERSION="1.3"
logging.info(f"Backend version {VERSION} started")

logging.basicConfig(level=logging.INFO,
                    datefmt='%Y-%m-%d %H:%M:%S',
                    format="%(asctime)s [%(name)-12.12s] [%(levelname)-5.5s] %(filename)s %(lineno)s %(message)s")

from pre_processing import pre_processing, siriusplayers

df = pre_processing.openExcelFile()
df_rank = pre_processing.open_excel_file_ranked()
df_sirius = siriusplayers.load_sirius_players()

min_max_scaler = preprocessing.MinMaxScaler()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "slemmig-torsk"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1) # 5 minutes
jwt = JWTManager(app)
CORS(app)
app.config['JSON_AS_ASCII'] = False
# app.config['APPLICATION_ROOT'] = '/api/v1'

# Generic Exception Handler
@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response




# forward positions
forwardPos = ['SS', 'CF', 'LWF', 'RWF', 'LW', 'RW']

midfielderPos = ['RCMF', 'LCMF', 'AMF', 'DMF', 'RDMF', 'LDMF', 'RAMF', 'LAMF']

defenderPos = ['RB', 'RCB', 'LCB', 'LB', 'RCB3', 'CB', 'LCB3', 'RWB', 'LWB', 'RB5', 'LB5']

def flatten(l):
    return [item for sublist in l for item in sublist]

# Return all players from list of positions. i.e forwards, midfielders or defenders
def allPlayersForPosition(position_list):
    result = {}
    df_copy = df.copy()
    positionJson = json.loads(df_copy["Position"].to_json())
    for player in positionJson:
        playerPosTemp = positionJson[player]
        playerPos = playerPosTemp.split(",")
        for position in position_list:
            for pos in playerPos:
                if position == pos:
                    result[player] = playerPosTemp
    return json.dumps(result)

def allPlayerInfo(id):
    df_copy = df.copy()
    return df_copy[id:id+1].to_json(force_ascii=False)

def all_player_info_ranked(id):
    df_copy = df_rank.copy()
    return df_copy[id:id+1].to_json(force_ascii=False)


def specific_info(stats, id: int):
    specificData = pd.DataFrame()
    df_copy = df.copy()
    playerData = df_copy[id:id+1]

    for entries in stats:
        specificData[entries] = playerData[entries]

    return specificData

    # x_scaled = min_max_scaler.fit_transform(df)
    # df_normalized = pd.DataFrame(x_scaled)
    
def spiderData(stats, ids, positions):
    logging.info("====FUNCTION========IN SPIDERDATA===============")
    df_temp = df.copy()
    specific_positions = positions.split("$")
    try:
        specific_positions.remove("")
    except ValueError:
        pass
    specific_positions_upper = [x.upper() for x in specific_positions]
    is_in_positions = filter_for_position_arr(df_temp["Position"], specific_positions_upper)
    df_temp = df_temp[is_in_positions].reset_index()
    df_temp = df_temp.set_index('index')
    df_pos = pd.DataFrame()
    df_spider = pd.DataFrame()
    for mall in stats:
        df_pos = pd.concat([df_pos, df_temp[mall]], axis=1)
        malldf = df_temp[mall]
        df_spider = pd.concat([df_spider, malldf], axis=1)
    df_pos = pd.DataFrame(df_pos.mean().to_dict(), index=[df_pos.index.values[-1]+1])
    logging.info("df_pos shape: ", str(df_pos.shape))
    df_spider = pd.concat([df_spider, df_pos])
    logging.info("df_spider and df_pos concat shape:", str(df_spider.shape))
    df_norm = pd.DataFrame(min_max_scaler.fit_transform(df_spider))
    df_norm.index = list(df_spider.index.values)
    df_norm.columns = flatten(stats)
    ids = list(map(lambda x: int(x), ids))
    df_final = pd.concat([df_norm.loc[ids], df_norm.iloc[-1:]])

    return df_final.to_json(force_ascii=False)

def allInfoPlayers(ids):
    df_copy = df.copy()
    return df_copy.iloc[ids].to_json(force_ascii=False, orient="records")

def specific_info_multiID(stats, ids):
    df_copy = df.copy()
    df_stats = df_copy[stats]
    newdf = df_stats.iloc[ids]
    return newdf.to_json(force_ascii=False)

def get_max_for_stat(stats, data: pd.DataFrame):
    result = {}

    for stat in stats:
        if data[stat].max() == 'NaN':
            result[stat] = 0
        else:
            result[stat] = float(data[stat].max())

    return json.dumps(result)

def basic_info():
    df_copy = df.copy()
    result = df_copy[["Player", "Team within selected timeframe", "League", "Age", "Position", "Minutes played", "Height", "Foot", "Contract expires", "Market value"]]
    result = result.reset_index()

    return result.to_json(force_ascii=False, orient="records")

def fixStatsArray(stats):
    result = []
    euro = stats.split("€")
    try:
        euro.remove("")
    except ValueError:
        pass
    for mall in euro:
        dollar = mall.split("$")
        try:
            dollar.remove("")
        except ValueError:
            pass
        result.append(dollar)
    return result
# Creates a series of true/false depending on if any value in series is present in arr
def filter_for_position_arr(series: pd.Series, arr: Array) -> pd.Series: 
        result = []
        
        for _, value in series.iteritems():
            #also removes spaces after split, if there are any (there were in some)
            new_arr = [x.strip() for x in value.split(",")]
            #ugly done flag
            done = False
            for val in new_arr:
                # Check if any position in df["Position"] exists in arr
                if val in arr and not done:
                    result.append(True)
                    # To make sure we do not return true for many positions
                    # Ex. if a player has ["RCB", "CB", "RB"] and we are checking for defender positions
                    # We only want to return true once, and not for all their positions
                    # To keep len(result) == len(series) true
                    done = True
            if not done:
                result.append(False)
        return pd.Series(result)

def allStats():
    return json.dumps(list(df.columns)[9:-1])

def all_player_info_ranked(id):
    return df_rank[id:id+1].to_json(force_ascii=False)






@app.after_request
def refresh_expiring_jwts(response):
    """
    This function is called after each request. If the JWT has expired, a new one is generated and returned to the client.
    """
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(hours=1))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


# Login route
# Route shall give access to 2 users, sirius and odense
# sirius has password mingradona23
# odense has password orstermiti15
@app.route("/login", methods=["POST"])
def login():

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    if username == "sirius" and password == "mingradona23":
        pass
    elif username == "odense" and password == "orstermiti15":
        pass
    else:
        return jsonify({"msg": "Bad username or password"}), 401

    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

 # Logout route
@app.route("/logout", methods=["POST"])
@cross_origin()
@jwt_required()  
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

# Status route
@app.route("/status", methods=["GET"])
@cross_origin()
@jwt_required()  
def status():
    return jsonify({
        "msg": "status ok",
        "numplayers": len(df),
        }), 200

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/all")
@jwt_required()  
def all():
    logging.info("starting /all")
    json = df.to_json(force_ascii = False)
    logging.info("done with /all")
    return json

@app.route("/playersAllsvenskan")
@jwt_required()  
def players():
    logging.info("starting /playersAllsvenskan")
    df_copy = df.copy()
    json = df_copy["Player"].to_json(force_ascii=False)
    logging.info("done with /playersAllsvenskan")
    return json

@app.route("/teams")
@jwt_required()  
def teams():
    logging.info("starting /teams")
    df_copy = df.copy()
    json = df_copy["Team"].to_json(force_ascii=False)
    logging.info("done with /teams")
    return json

@app.route("/fwdAllsvenskan")
@jwt_required()  
def fwd_allsvenskan():
    logging.info("starting /fwdAllsvenskan")
    json = allPlayersForPosition(forwardPos)
    logging.info("done with /fwdAllsvenskan")
    return json

@app.route("/midAllsvenskan")
@jwt_required()  
def mid_allsvenskan():
    logging.info("starting with /midAllsvenskan")
    json = allPlayersForPosition(midfielderPos)
    logging.info("done with /midAllsvenskan")
    return json

@app.route("/defAllsvenskan")
@jwt_required()  
def def_allsvenskan():
    logging.info("starting with /defAllsvenskan")
    df_copy = df.copy()
    is_defender = filter_for_position_arr(df_copy["Position"], defenderPos)
    json = df_copy[is_defender].to_json(orient="records")
    logging.info("done with /defAllsvenskan")
    return json

@app.route("/gkAllsvenskan")
@jwt_required()  
def gk_allsvenskan():
    logging.info("starting with /gkAllsvenskan")
    df_copy = df.copy()
    result = {}
    positionJson = json.loads(df_copy["Position"].to_json())
    for player in positionJson:
        if positionJson[player] == "GK":
            result[player] = "GK"
    logging.info("done with /gkAllsvenskan")
    return json.dumps(result)

@app.route("/player/<id>")
@jwt_required()  
def player(id):
    logging.info("starting /player/<id>")
    json = allPlayerInfo(int(id))
    logging.info("done with /player/<id>")
    return json

@app.route("/specificData/<id>/<stats>") 
@jwt_required()  
def specificPlayerStats1(id=None, stats=None):
    logging.info("starting /specificData/<id>/<stats>")
    specificStats = stats.split("$")
    try:
        specificStats.remove("")
    except ValueError:
        pass
    json = specific_info(specificStats, int(id)).to_json(force_ascii=False)
    logging.info("done with /specificData/<id>/<stats>")
    return json

@app.route("/specificDataRanked/<id>/<stats>")
@jwt_required()  
def specificPlayerStatsRanked(id=None, stats=None):
    logging.info("starting /specificDataRanked/<id>/<stats>")
    specificStats = stats.split("$")
    try:
        specificStats.remove("")
    except ValueError:
        pass
    stats = specific_info(specificStats, int(id))
    stats = stats.rank(pct=True)
    logging.info("done with /specificDataRanked/<id>/<stats>")
    return stats

@app.route("/specificDataMultiID/<ids>/<stats>")
@jwt_required()  
def specificPlayersStats(ids = None, stats=None):
    logging.info("starting /specificDataMultiID/<ids>/<stats>")
    specificStats = stats.split("$")
    try:
        specificStats.remove("")
    except ValueError:
        pass
    specificIDS = ids.split("$")
    try:
        specificIDS.remove("")
    except ValueError:
        pass
    json = specific_info_multiID(specificStats, specificIDS)
    logging.info("done with /specificDataMultiID/<ids>/<stats>")
    return json

@app.route("/BasicInfoPlayers") 
@jwt_required()  
def basic_info_cock():
    return basic_info()

@app.route("/stats")
@jwt_required()  
def stats():
    return allStats()

@app.route("/spider/<ids>/<stats>/<positions>")
@jwt_required()  
def spiders(ids = None, stats=None, positions=None):
    specificIDS = ids.split("$")
    try:
        specificIDS.remove("")
    except ValueError:
        pass
    return spiderData(fixStatsArray(stats), specificIDS, positions)

@app.route("/players/<ids>")
@jwt_required()  
def playersFyn(ids = None):
    specificIDS = ids.split("$")
    try:
        specificIDS.remove("")
    except ValueError:
        pass
    return allInfoPlayers(specificIDS)

dashboardEntries = [] # Adrian pls help
@app.route("/dashboardStats/<id>")
@jwt_required()  
def dashboard():
    return specific_info(dashboardEntries,int(id)).to_json(force_ascii=False)

@app.route("/maxStats/<stats>")
@jwt_required()  
def max_stats_all(stats=None):
    df_copy = df.copy()
    plays_alot = df_copy["Minutes played"] > 500
    df_plays_alot = df_copy[plays_alot]

    specificStats = stats.split("$")
    try:
        specificStats.remove("")
    except ValueError:
        pass

    return get_max_for_stat(specificStats, df_plays_alot)

@app.route("/maxStatsFromArray/<stats>/<positions>")
@jwt_required()  
def max_stats_for_positionArray(stats=None, positions=None):
    df_copy = df.copy()
    # Remove outliers
    plays_alot = df_copy["Minutes played"] > 500
    df_temp = df_copy[plays_alot]
    
    specificPositions=positions.split("$")
    try:
        specificPositions.remove("")
    except ValueError:
        pass
    specificStats = stats.split("$")
    try:
        specificStats.remove("")
    except ValueError:
        pass
    is_in_positions = filter_for_position_arr(df_temp["Position"], specificPositions)
    df_temp = df_temp[is_in_positions]

    print("Length of df with filter: ", str(specificPositions),": ", df_temp.shape[0])

    return get_max_for_stat(specificStats, df_temp)

@app.route("/playerCount/<positions>")
@jwt_required()  
def player_count(positions=None):
    df_temp = df.copy()
    specific_positions = positions.split("$")
    try:
        specific_positions.remove("")
    except ValueError:
        pass
    specific_positions_upper = [x.upper() for x in specific_positions]
    is_in_positions = filter_for_position_arr(df_temp["Position"], specific_positions_upper)
    df_temp = df_temp[is_in_positions]

    return str(df_temp.shape[0])

@app.route("/playerCountAll/")
@jwt_required()  
def player_count_all():
    return str(df.shape[0])

@app.route("/playerRating/<id>")
@jwt_required()  
def get_player_rating(id:int):
    df_temp = df.iloc[[id]].filter(regex="Rating")
    df_temp["Player"] = df.iloc[[id]]["Player"]
    df_temp["Age"] = df.iloc[[id]]["Age"]
    df_temp["Team"] = df.iloc[[id]]["Team"]
    df_temp["Position"] = df.iloc[[id]]["Position"]
    df_temp["Weight"] = df.iloc[[id]]["Weight"]
    df_temp["Height"] = df.iloc[[id]]["Height"]
    df_temp["Market value"] = df.iloc[[id]]["Market value"]
    return df_temp.to_json(orient="records")

@app.route("/top15/<position>")
@jwt_required()  
def top_15_for_position(position=None):
    rating_col = "Rating as " + position
    df_copy = df.copy()
    df_temp = df_copy[['Player', 'Age', 'Team', 'Market value', rating_col]]
    df_temp_toplist = df_temp.nlargest(15, rating_col)
    return df_temp_toplist.to_json(orient='records')

@app.route("/playerRanked/<id>")
@jwt_required()  
def playerRanked(id):
    return all_player_info_ranked(int(id))

@app.route("/playerRanking/<id>")
@jwt_required()  
def playerRanking(id:int):
    result = {}
    
    for rating in ["Rating as CB", "Rating as WB", "Rating as SIX", "Rating as EIGHT", "Rating as SEVEN", "Rating as TEN", "Rating as NINE"]:
        df_temp = df.sort_values(by=rating, ascending=False)
        df_temp.reset_index(inplace=True)
        # get rank of player after sorting by rating

        string = rating.replace("Rating", "Ranking")

        result[string] = df_temp[df_temp["index"] == int(id)].index + 1

        # Drop players that dont play in that position
        df_temp = df_temp.dropna(subset=[rating])

        # String is now only the position
        string = rating.replace("Rating as ", "")
        
        #Add total players for that position
        result[string + " TOTAL"] = df_temp.shape[0]

    return pd.DataFrame(result).to_json(orient='records')

@app.route("/statsForPositions/<positions>/<stats>")
@jwt_required()  
def statsForPos(positions=None, stats=None):
    df_temp = df.copy()
    specific_positions = positions.split("$")
    try:
        specific_positions.remove("")
    except ValueError:
        pass
    specific_positions_upper = [x.upper() for x in specific_positions]
    is_in_positions = filter_for_position_arr(df_temp["Position"], specific_positions_upper)
    df_temp = df_temp[is_in_positions]
    specific_stats = stats.split("$")
    try:
        specific_stats.remove("")
    except ValueError:
        pass
    df_temp = df_temp[specific_stats]

    return df_temp.to_json(force_ascii=False)

    # normalized_df = (df_mall-df_mall.mean())/df_mall.std()

@app.route("/averageForPositions/<positions>/<stats>")
@jwt_required()  
def avgForPos(positions=None, stats=None):
    df_temp = df.copy()
    specific_positions = positions.split("$")
    try:
        specific_positions.remove("")
    except ValueError:
        pass
    specific_positions_upper = [x.upper() for x in specific_positions]
    is_in_positions = filter_for_position_arr(df_temp["Position"], specific_positions_upper)
    df_temp = df_temp[is_in_positions]
    avgSpider = pd.DataFrame()
    for mall in fixStatsArray(stats):
        df_mall = df_temp[mall]
        normalized_df = (df_mall-df_mall.mean())/df_mall.std()
        avgSpider = pd.concat([avgSpider, normalized_df], axis=1)
        

    avgSpider = avgSpider.loc[:,~avgSpider.columns.duplicated()].copy()
    avgSpider = pd.DataFrame(avgSpider.mean().to_dict(), index=[avgSpider.index.values[-1]])
    return avgSpider.to_json(force_ascii=False)

@app.route("/filterPlayers", methods=['POST'])
@jwt_required()  
def filterPlayers():
    df_temp = df.copy()
    content = request.json
    for filter in content:
        df_temp = df_temp[df_temp[filter["stat"]] >  float(filter["value"])]


    df_temp = df_temp.reset_index()
    return df_temp.to_json(force_ascii=False, orient="records")

@app.route("/siriusplayers")
def siriusallplayers():
    df_temp = df_sirius.copy()
    return df_temp.to_json(force_ascii=False, orient="records")

@app.route("/siriusplayers/names")
def siriusnames():
    names = df_sirius['Name'].unique()
    return jsonify({'names': names.tolist()})

@app.route("/siriusplayers/availablestats")
def available_stats():
    cols = list(df_sirius.columns)
    cols.remove('Name')
    cols.remove('Year')
    return jsonify({'stats': cols})

# @app.route("/siriusplayers/trendline", methods=["POST"])
# def trendline():
#     df_temp = df_sirius.copy()
#     content = request.json
#     df_temp = df_temp[df_temp['Name'] == content['player']]
#     years = df_temp['Year'].unique()
#     result = []
#     sums = []
#     for stat in content['stats']:
#         df_t = df_temp.groupby('Year')[stat].mean()
#         df_sum = df_temp.groupby('Year')[stat].sum()
#         for year in years:
#             d = {}
#             s = {}
#             d['Year'] = int(year)
#             d[stat] = float(df_t[year])
#             s['Year'] = int(year)
#             s[stat] = float(df_sum[year])
#             result.append(d)
#             sums.append(s)
#     return {'data': result, 'sums': sums}

@app.route("/siriusplayers/trendline", methods=["POST"])
def trendline_normalized():
    df_temp = df_sirius.copy()
    content = request.json
    df_temp = df_temp[df_temp['Name'] == content['player']]
    years = df_temp['Year'].unique()
    data_norm = []
    sums = []
    data = []
    df_stats = df_temp.iloc[:, 2:]
    df_norm = pd.DataFrame(min_max_scaler.fit_transform(df_stats))
    df_norm.columns = list(df_stats.columns)
    df_norm.insert(0, 'Year', df_temp['Year'])
    for stat in content['stats']:
        df_t = df_temp.groupby('Year')[stat].mean()
        df_n = df_norm.groupby('Year')[stat].mean()
        df_sum = df_temp.groupby('Year')[stat].sum()
        for year in years:
            d = {}
            s = {}
            a = {}
            d['Year'] = int(year)
            d[stat] = float(df_n[year])
            s['Year'] = int(year)
            s[stat] = float(df_sum[year])
            a['Year'] = int(year)
            a[stat] = float(df_t[year])
            data_norm.append(d)
            sums.append(s)
            data.append(a)
    return {'data_n': data_norm, 'sums': sums, 'data': data}


if __name__ == '__main__':    
    app.run(debug=True, host='0.0.0.0', port=5000)
