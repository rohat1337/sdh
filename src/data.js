import { Radar } from 'recharts'
var _ = require('lodash')


var colors = ["#FFC1CF", "#E8FFB7", "#E2A0FF", "#C4F5FC", "#B7FFD8"]

var nine = ['cf']
var nineDef = ['Successful defensive actions per 90', 'Defensive duels per 90', 
              'Defensive duels won, %', 'Aerial duels per 90', 'Aerial duels won, %']

var nineGoalOpp = ['Dribbles per 90', 'Successful dribbles, %', 'xG per 90', 'Non-penalty goals per 90',
                  'xA per 90', 'Shot assists per 90', 'Touches in box per 90']

var ninePlay = ['Received passes per 90', 'Accurate passes, %', 'Passes to penalty area per 90',
                'Accurate passes to penalty area, %', 'Deep completions per 90', 'Progressive runs per 90']



export function getPlayerStats(id) {
  try {
    return fetch(`http://localhost:5000/player/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export function getSpecificStats(id, stats) {
  try {
    return fetch(`http://localhost:5000/specificData/${id}/${arrayToString(stats)}`).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
  })
  } catch (error) {
    console.log(error)
  }
}

export const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}

export function fix(str) {
  return str.replace('š', 's').replace('ć', 'c').replace('č', 'c').replace('ó', 'o')
}

function arrayToString(stats) {
  var result = "";

  stats.forEach(statsInArray => {
    result += statsInArray
    result += "$"
  });

  return result;
}

function arrayOfArrayToString(statsArray) {
  var result = ""

  for (var mall of statsArray) {
   result += arrayToString(mall)
   result += "€"
  }
  return result
}

export function fixPlayerPositions(position) {

  var result = [];
  // var result = "";
  var arrayOfPositions = position.toLowerCase().split(", ")


  for (let index = 0; index < arrayOfPositions.length; index++) {

    if(arrayOfPositions[index] == "gk"){
      result.push("MV")
    }

    else if (arrayOfPositions[index] == "cf") {
      result.push("9")
    }

    else if (arrayOfPositions[index] == "lw" || arrayOfPositions[index] == "lmf" || arrayOfPositions[index] == "lamf" || arrayOfPositions[index] == "lwf") {
      result.push("7 (v)")
    }

    else if (arrayOfPositions[index] == "rw" || arrayOfPositions[index] == "rmf" || arrayOfPositions[index] == "ramf" || arrayOfPositions[index] == "rwf") {
      result.push("7 (h)")
    }


    else if (arrayOfPositions[index] == "amf") {
      result.push("10")
    }


    else if (arrayOfPositions[index] == ("lcmf") || arrayOfPositions[index] == ("rcmf")) {
      result.push("8")
    }

    else if (arrayOfPositions[index] == ("dmf") || arrayOfPositions[index] == ("ldmf") || arrayOfPositions[index] == ("rdmf")) {
      result.push("6")
    }

    else if (arrayOfPositions[index] == "lb" || arrayOfPositions[index] == ("lwb")) {
      result.push("WB (v)")
    }

    else if (arrayOfPositions[index] == "rb" || arrayOfPositions[index] == ("rwb")) {
      result.push("WB (h)")
    }


    else if (arrayOfPositions[index] == "lcb" || arrayOfPositions[index] == "rcb" || arrayOfPositions[index] == "cb") {
      result.push("MB")
    }
  }

  result.sort()
  result = [...new Set(result)]
  return result.join(", ")

  
}



export function uncheckFieldBox(field, box) {
  box = box.replace("0", "").split(", ")
  return field.filter(ele => !box.includes(ele))
}

export function allsvenskanPlayers() {
  try {
    return fetch(`http://localhost:5000/playersAllsvenskan`)
  } catch (error) {
    console.log(error)
  }
}

export function getBasicStats() {
  try {
    return fetch(`http://localhost:5000/BasicInfoPlayers`)
  } catch (error) {
    console.log(error)
  }
}

export function getStatNames() {
  try {
    return fetch(`http://localhost:5000/stats`).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
  })
  } catch (error) {
    console.log(error)
  }
}

export function getSpecificStatsMultiID(ids, stats) {
  try {
    return fetch(`http://localhost:5000/specificDataMultiID/${arrayToString(ids)}/${arrayToString(stats)}`).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
  })
  } catch (error) {
    console.log(error)
  }
}

export function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return !_.isEqual(ele, value)
  });
}

export function filterArray(arr, value) {
  return arr.filter(function (ele) {
    return ele.toLowerCase().includes(value.toLowerCase())
  })
}

export function renderRadars(players) {

  const radars = players.map((player) => {
    var color = colors[player.ID % colors.length]
    return <Radar 
            name={player.Name}
            dataKey={parseInt(player.ID)} 
            stroke={color} 
            fill={color} 
            fillOpacity={0.6} />
  })
  return radars
}

export function setMall(field) {
  if (field.length !== 0) {
    var result = JSON.stringify(field) === JSON.stringify(nine) ? [nineGoalOpp, ninePlay]  : {}
    return result
  }
}

function fetchSpider(ids, mall) {
  setTimeout(() => {
    getSpecificStatsMultiID(ids, mall).then((data) => {
      console.log(data)
    })
  }, 1000)
}

export function setSpiders(stats, ids) {
  for (var mall of stats) {
    fetchSpider(ids, mall)
  }
}

export function makeSpiders(stats, ids) {
  try {
    return fetch(`http://localhost:5000/specificDataMultiID/${arrayToString(ids)}/${arrayOfArrayToString(stats)}`).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
  })
  } catch (error) {
    console.log(error)
  }
}

export function testSpiderFetch(ids, stats) {
  try {
    return fetch(`http://localhost:5000/spider/${arrayToString(ids)}/${arrayOfArrayToString(stats)}`).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
  })
  } catch (error) {
    console.log(error)
  }
}

export function fixSpiderData(spiderData) {
  var result = {}

  // Goal Spider
  var goalkpis = []
  for (var key of nineGoalOpp) {
    var obj = {}
    obj["KPI"] = key
    for (var playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    goalkpis.push(obj)
  }
  result["Goal"] = goalkpis
  
  // Play spider
  var playkpis = []
  for (var key of ninePlay) {
    var obj = {}
    obj["KPI"] = key
    for (var playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    playkpis.push(obj)
  }
  result["Play"] = playkpis

  return result
}