
from flask import Flask, redirect, url_for, render_template, request, flash
import pandas as pd
import sys
import numpy as np
import json
from flask_cors import CORS

#df = pd.read_excel("Search results.xlsx",engine='openpyxl');
df = pd.read_excel('playersAllsvenskan.xlsx')

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False

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

def basic_info():
    new_df = pd.DataFrame()
    df.replace(r'^\s*$', "cock", regex=True)
    stats = ["Player", "Team within selected timeframe", "Age", "Position", "Minutes played"]

    for label, content in df.items():
       for stat in stats:
            if label == stat:
                new_df[label] = content

    return new_df.to_json(force_ascii=False)

def fixStatsArray(stats):
    result = []
    euro = stats.split("€")
    euro.remove("")
    for mall in euro:
        dollar = mall.split("$")
        dollar.remove("")
        result.append(dollar)
    return result

def allStats():
    return json.dumps(list(df.columns)[9:-1])

@app.route("/")
def index():
    return render_template("index.html")

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
    return allPlayersForPosition(defenderPos)

@app.route("/gkAllsvenskan")
def gk_allsvenskan():
    print("HEEEEEEEjjjjjjJ")
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

if __name__ == '__main__':    
    app.run(debug=True, host='0.0.0.0', port=5000)