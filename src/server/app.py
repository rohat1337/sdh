
from multiprocessing.dummy import Array
from flask import Flask, redirect, url_for, render_template, request, flash
import pandas as pd
import sys
import numpy as np
import json
from flask_cors import CORS

from pre_processing import pre_processing

df = pre_processing.openExcelFile()
print("df shape after read: ", df.shape[0])

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
# app.config['APPLICATION_ROOT'] = '/api/v1'

# forward positions
forwardPos = ['SS', 'CF', 'LWF', 'RWF', 'LW', 'RW']

midfielderPos = ['RCMF', 'LCMF', 'AMF', 'DMF', 'RDMF', 'LDMF', 'RAMF', 'LAMF']

defenderPos = ['RB', 'RCB', 'LCB', 'LB', 'RCB3', 'CB', 'LCB3', 'RWB', 'LWB', 'RB5', 'LB5']

# Return all players from list of positions. i.e forwards, midfielders or defenders
def allPlayersForPosition(position_list):
    result = {}
    positionJson = json.loads(df["Position"].to_json())
    for player in positionJson:
        playerPosTemp = positionJson[player]
        playerPos = playerPosTemp.split(",")
        for position in position_list:
            for pos in playerPos:
                if position == pos:
                    result[player] = playerPosTemp
    return json.dumps(result)

def allPlayerInfo(id):
    return df[id:id+1].to_json(force_ascii=False)


def specific_info(stats, id: int):
    specificData = pd.DataFrame()
    playerData = df[id:id+1]

    for entries in stats:
        specificData[entries] = playerData[entries]

    return specificData.to_json(force_ascii=False)

def spiderData(stats, ids):
    spider = pd.DataFrame(columns=ids)
    for mall in stats:
        df_mall = df[mall]
        normalized_df = (df_mall-df_mall.mean())/df_mall.std()
        #normalized_df = df_mall.rank(pct=True)
        newdf = normalized_df.iloc[ids]
        spider = pd.concat([spider, newdf], axis=1)
    
    spider = spider.iloc[:, len(ids):]

    return spider.to_json(force_ascii=False)

def allInfoPlayers(ids):
    return df.iloc[ids].to_json(force_ascii=False, orient="records")

def specific_info_multiID(stats, ids):
    df_stats = df[stats]
    normalized_df = (df_stats-df_stats.mean())/df_stats.std()
    newdf = normalized_df.iloc[ids]
    newdf = newdf[stats]
    return newdf.to_json(force_ascii=False)
def get_max_for_stat(stats, data: pd.DataFrame):
    result = {}
    print(len(data))

    for stat in stats:
        if data[stat].max() == 'NaN':
            result[stat] = 0
        else:
            result[stat] = float(data[stat].max())

    return json.dumps(result)

def basic_info():

    result = df[["Player", "Team within selected timeframe", "League", "Age", "Position", "Minutes played", "Height", "Foot", "Contract expires"]].copy()
    result = result.reset_index()

    return result.to_json(force_ascii=False, orient="records")

def fixStatsArray(stats):
    result = []
    euro = stats.split("???")
    euro.remove("")
    for mall in euro:
        dollar = mall.split("$")
        dollar.remove("")
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

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/all")
def all():
    return df.to_json(force_ascii = False)

@app.route("/playersAllsvenskan")
def players():
    return df["Player"].to_json(force_ascii=False)

@app.route("/teams")
def teams():
    return df["Team"].to_json(force_ascii=False)

@app.route("/fwdAllsvenskan")
def fwd_allsvenskan():
    return allPlayersForPosition(forwardPos)

@app.route("/midAllsvenskan")
def mid_allsvenskan():
    return allPlayersForPosition(midfielderPos)

@app.route("/defAllsvenskan")
def def_allsvenskan():

    is_defender = filter_for_position_arr(df["Position"], defenderPos)
    return df[is_defender].to_json(orient="records")

@app.route("/gkAllsvenskan")
def gk_allsvenskan():
    result = {}
    positionJson = json.loads(df["Position"].to_json())
    for player in positionJson:
        if positionJson[player] == "GK":
            result[player] = "GK"
    return json.dumps(result)

@app.route("/player/<id>")
def player(id):
    return allPlayerInfo(int(id))

@app.route("/specificData/<id>/<stats>") 
def specificPlayerStats1(id=None, stats=None):
    specificStats = stats.split("$")
    specificStats.remove("")
    return specific_info(specificStats, int(id))

@app.route("/specificDataMultiID/<ids>/<stats>")
def specificPlayersStats(ids = None, stats=None):
    specificStats = stats.split("$")
    specificStats.remove("")
    specificIDS = ids.split("$")
    specificIDS.remove("")
    return specific_info_multiID(specificStats, specificIDS)

@app.route("/BasicInfoPlayers") 
def basic_info_cock():
    return basic_info()

@app.route("/stats")
def stats():
    return allStats()

@app.route("/spider/<ids>/<stats>")
def spiders(ids = None, stats=None):
    specificIDS = ids.split("$")
    specificIDS.remove("")
    return spiderData(fixStatsArray(stats), specificIDS)

@app.route("/players/<ids>")
def playersFyn(ids = None):
    specificIDS = ids.split("$")
    specificIDS.remove("")
    return allInfoPlayers(specificIDS)

dashboardEntries = [] # Adrian pls help
@app.route("/dashboard/<id>")
def dashboard():
    return specific_info(dashboardEntries,int(id))

@app.route("/maxStats/<stats>")
def max_stats_all(stats=None):
    plays_alot = df["Minutes played"] > 500
    df_plays_alot = df[plays_alot]

    specificStats = stats.split("$")
    specificStats.remove("")

    return get_max_for_stat(specificStats, df_plays_alot)

@app.route("/maxStatsFromArray/<stats>/<positions>")
def max_stats_for_positionArray(stats=None, positions=None):

    # Remove outliers
    plays_alot = df["Minutes played"] > 500
    df_temp = df[plays_alot]
    
    specificPositions=positions.split("$")
    specificPositions.remove("")

    specificStats = stats.split("$")
    specificStats.remove("")

    is_in_positions = filter_for_position_arr(df["Position"], specificPositions)
    df_temp = df_temp[is_in_positions]

    print("Length of df with filter: ", str(specificPositions),": ", df_temp.shape[0])

    return get_max_for_stat(specificStats, df_temp)

@app.route("/playerCount/<positions>")
def player_count(positions=None):
    df_temp = df.copy()
    specific_positions = positions.split("$")
    specific_positions.remove("")
    specific_positions_upper = [x.upper() for x in specific_positions]
    

    is_in_positions = filter_for_position_arr(df["Position"], specific_positions_upper)
    df_temp = df_temp[is_in_positions]

    return str(df_temp.shape[0])

@app.route("/playerCountAll/")
def player_count_all():
    return str(df.shape[0])

@app.route("/playerRating/<id>")
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
def top_15_for_position(position=None):
    rating_col = "Rating as " + position
    df_temp = df[['Player', 'Age', 'Team', 'Market value', rating_col]]
    df_temp_toplist = df_temp.nlargest(15, rating_col)
    return df_temp_toplist.to_json(orient='records')

@app.route("/playerRanking/<id>")
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

if __name__ == '__main__':    
    app.run(debug=True, host='0.0.0.0', port=5000)