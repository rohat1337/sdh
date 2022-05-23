import { Radar } from 'recharts'
import { positions, positionsArray } from './positions'

var _ = require('lodash')


var colors = ["#FFC1CF", "#E8FFB7", "#E2A0FF", "#C4F5FC", "#B7FFD8"]



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
    var color = colors[players.indexOf(player)]
    return <Radar 
            name={player.Name}
            dataKey={parseInt(player.ID)} 
            stroke={color} 
            fill={color} 
            fillOpacity={0.6} />
  })
  return radars
}

export function setMall2(field) {
  if (field.length !== 0) {
    let result;
    for (var position of positions) {
      if (JSON.stringify(field) === JSON.stringify(position.positions)) {
        result = { position: position.positions, stats: [position.kpis.def, position.kpis.goalOppurtiny, position.kpis.playmaking, position.kpis.overall_fetch]}
      }
    }
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

export function fixSpiderData2(spiderData, position) {
  var result = {}
  let p
  for (var pos of positions) {
    if (JSON.stringify(pos.positions) == JSON.stringify(position)) {
      p = pos
    }
  }

  // Goal Spider
  var goalkpis = []
  for (var key of p.kpis.goalOppurtiny) {
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
  for (var key of p.kpis.playmaking) {
    var obj = {}
    obj["KPI"] = key
    for (var playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    playkpis.push(obj)
  }
  result["Play"] = playkpis

  // Def spider
  var defkpis = []
  for (var key of p.kpis.def) {
    var obj = {}
    obj["KPI"] = key
    for (var playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    defkpis.push(obj)
  }
  result["Def"] = defkpis

  // Sammanställning
  var overallkpis = []
  for (var key of p.kpis.overall) {
    var obj = {}
    obj["KPI"] = key
    for (var playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    overallkpis.push(obj)
  }
  result["Overall"] = overallkpis

  return result
}