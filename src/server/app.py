
from multiprocessing.dummy import Array
from flask import Flask, redirect, url_for, render_template, request, flash
import pandas as pd
import sys
import numpy as np
import json
from flask_cors import CORS

from pre_processing import pre_processing

df = pre_processing.openExcelFile()

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
    new_df = pd.DataFrame()
    df.replace(r'^\s*$', "cock", regex=True)
    stats = ["Player", "Team within selected timeframe", "Age", "Position", "Minutes played", "Height", "Foot", "Contract expires"]

    for label, content in df.items():
       for stat in stats:
            if label == stat:
                new_df[label] = content

    return new_df.to_json(force_ascii=False)

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

@app.route("/BasicInfoPlayers") 
def basic_info_cock():
    return basic_info()

@app.route("/stats")
def stats():
    return allStats()


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
    specificPositions = positions.split("$")
    specificPositions.remove("")

    is_in_positions = filter_for_position_arr(df["Position"], specificPositions)
    df_temp = df_temp[is_in_positions]

    return str(df_temp.shape[0])

@app.route("/playerCountAll/")
def player_count_all():
    return str(df.shape[0])

if __name__ == '__main__':    
    app.run(debug=True, host='0.0.0.0', port=5000)