import { Radar } from 'recharts'
import { positions } from './positions'
import { Dimensions } from 'react-native-web'
import config from "./config.json";

const _ = require('lodash')

const colors = ['#FFC1CF', '#E8FFB7', '#E2A0FF', '#C4F5FC', '#B7FFD8']

const url = process.env.REACT_APP_SERVER

export function getPlayerStats (id) {
  try {
    return fetch(`${url}/player/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export function getSpecificStats (id, stats) {
  try {
    return fetch(`${url}/specificData/${id}/${arrayToString(stats)}`).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

function arrayToString (stats) {
  let result = ''

  stats.forEach(statsInArray => {
    result += statsInArray
    result += '$'
  })

  return result
}

function arrayOfArrayToString (statsArray) {
  let result = ''

  for (const mall of statsArray) {
    result += arrayToString(mall)
    result += '€'
  }
  return result
}

export function getFontSize () {
  const windowWidth = Dimensions.get('window').width

  if (windowWidth > 1800) {
    return 18
  } else {
    return 12
  }
}

export const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]))
}

export function fix (str) {
  return str.replace('š', 's').replace('ć', 'c').replace('č', 'c').replace('ó', 'o')
}

//skicka tillbaka rätt ändelse för en given siffra
//
// talet mod 10 ger ett resultat
// resultat 1 och 2 returnerar :a eftersom 'första' och 'andra'
// resultat 3 och resten returnerar :e eftersom 'tredje' osv
// med undantag 11 (11 mod 10 == 1) som också returnerar :e
export function fixSuffix(int) {
  //undantag
  if (int == 11) {
    return ":e"
  }

  //
  const result = int % 10
  if (result == 1 || result == 2) {
    return ":a"
  } else {
    return ":e"
  }
}

export function round_market_value(int) {
  return int / 1000000
}

export function fixPlayerPositions (position) {
  let result = []
  // var result = "";
  const arrayOfPositions = position.toLowerCase().split(', ')

  for (let index = 0; index < arrayOfPositions.length; index++) {
    if (arrayOfPositions[index] == "gk") {
      result.push("MV")
    }
    if (arrayOfPositions[index] == "cf") {
      result.push("9")
    }
    if (arrayOfPositions[index] == "lw" || arrayOfPositions[index] == "lmf" || arrayOfPositions[index] == "lamf" || arrayOfPositions[index] == "lwf") {
      result.push("7 (v)")
    }
    if (arrayOfPositions[index] == "rw" || arrayOfPositions[index] == "rmf" || arrayOfPositions[index] == "ramf" || arrayOfPositions[index] == "rwf") {
      result.push("7 (h)")
    }
    if (arrayOfPositions[index] == "amf" || arrayOfPositions[index] == "ramf" || arrayOfPositions[index] == "lamf") {
      result.push("10")
    }
    if (arrayOfPositions[index] == ("lcmf") || arrayOfPositions[index] == ("rcmf")) {
      result.push("8")
    }
    if (arrayOfPositions[index] == ("dmf") || arrayOfPositions[index] == ("ldmf") || arrayOfPositions[index] == ("rdmf")) {
      result.push("6")
    }
    if (arrayOfPositions[index] == "lb" || arrayOfPositions[index] == ("lwb")) {
      result.push("WB (v)")
    }
    if (arrayOfPositions[index] == "rb" || arrayOfPositions[index] == ("rwb")) {
      result.push("WB (h)")
    }
    if (arrayOfPositions[index] == "lcb" || arrayOfPositions[index] == "rcb" || arrayOfPositions[index] == "cb") {
      result.push("MB")
    }
  }

  result.sort()
  result = [...new Set(result)]
  return result.join(', ')
}

export function uncheckFieldBox (field, box) {
  box = box.replace('0', '').split(', ')
  return field.filter(ele => !box.includes(ele))
}

export function allsvenskanPlayers () {
  try {
    return fetch(`${url}/playersAllsvenskan`)
  } catch (error) {
    console.log(error)
  }
}

export function getBasicStats () {
  try {
    console.log("hello madafaka")
    return fetch(`${url}/BasicInfoPlayers`)
  } catch (error) {
    console.log(error)
  }
}

export function getStatNames () {
  try {
    return fetch(`${url}/stats`).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function getTopList(position) {
  try {
    return fetch(config.SERVER_URL + `top15/${position}`)
  } catch (error) {
    console.log(error)
  }
}

export function getSpecificStatsMultiID (ids, stats) {
  try {
    return fetch(`${url}/specificDataMultiID/${arrayToString(ids)}/${arrayToString(stats)}`).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsAll (stats) {
  try {
    return fetch(`${url}/maxStats/${arrayToString(stats)}`)
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsForPosition (stats, position) {
  try {
    return fetch(`${url}/maxStats/${arrayToString(stats)}/${position}`)
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsForPositionArray (stats, array) {
  try {
    return fetch(`${url}/maxStatsFromArray/${arrayToString(stats)}/${arrayToString(array)}`)
  } catch (error) {
    console.log(error)
  }
}

export function getPlayerCount(positions) {
  try {
    return fetch(config.SERVER_URL + `playerCount/${arrayToString(positions)}`)
  } catch (error) {
    console.log(error)
  }
}

export function getPlayerCountAll() {
  try {
    return fetch(config.SERVER_URL + `playerCountAll/`)
  } catch (error) {
    console.log(error)
  }
}

export function getPlayerRating(id) {
  try {
    return fetch(config.SERVER_URL + `playerRating/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export function getPlayerRanking(id) {
  try {
    return fetch(config.SERVER_URL + `playerRanking/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export function arrayRemove (arr, value) {
  return arr.filter(function (ele) {
    return !_.isEqual(ele, value)
  })
}

export function filterArray (arr, value) {
  return arr.filter(function (ele) {
    return ele.toLowerCase().includes(value.toLowerCase())
  })
}
export function checkFoot (player, left, right) {
  if ((left && right) || (!left && !right)) {
    // ??
    return true
  } else if (left && !right) {
    return (player.Foot === 'left')
  } else if (right && !left) {
    return (player.Foot === 'right')
  }
}

export function contractToString (milliSeconds) {
  const expiryDate = new Date(milliSeconds)
  return expiryDate.toString().slice(3, 7) + expiryDate.toString().slice(10, 15)
}

export function renderRadars (players) {
  const radars = players.map((player) => {
    const color = colors[players.indexOf(player)]
    return (
      <Radar
        key={parseInt(player.ID)}
        name={player.Player}
        dataKey={parseInt(player.ID)}
        stroke={color}
        fill={color}
        fillOpacity={0.6}
      />
    )
  })
  return radars
}

export function setMall2 (field) {
  if (field.length !== 0) {
    let result
    for (const position of positions) {
      if (JSON.stringify(field).toLowerCase === JSON.stringify(position.positions).toLowerCase) {
        result = { position: position.positions, stats: [position.kpis.def, position.kpis.goalOppurtiny, position.kpis.playmaking, position.kpis.overall_fetch] }
      }
    }
    return result
  }
}

// ???
function fetchSpider (ids, mall) {
  setTimeout(() => {
    getSpecificStatsMultiID(ids, mall).then((data) => {
      console.log(data)
    })
  }, 1000)
}

export function setSpiders (stats, ids) {
  for (const mall of stats) {
    fetchSpider(ids, mall)
  }
}

export function makeSpiders (stats, ids) {
  try {
    return fetch(`${url}/specificDataMultiID/${arrayToString(ids)}/${arrayOfArrayToString(stats)}`).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function testSpiderFetch (ids, stats) {
  try {
    return fetch(`${url}/spider/${arrayToString(ids)}/${arrayOfArrayToString(stats)}`).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function testSpiderFetch3 (ids, stats) {
  try {
    return fetch(`${url}/spider/${arrayToString(ids)}/${arrayToString(stats)}`).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function testSpiderFetch2 (ids, stats, setSpider) {
  try {
    return fetch(`${url}/spider/${arrayToString(ids)}/${arrayOfArrayToString(stats)}`).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    }).then((data) => {
      console.log(data)
    })
  } catch (error) {
    console.log(error)
  }
}

export function fixSpiderData2 (spiderData, position) {
  console.log(position)
  const result = {}
  let p
  for (const pos of positions) {
    if (JSON.stringify(pos.positions) === JSON.stringify(position)) {
      p = pos
    }
  }

  // Goal Spider
  const goalkpis = []
  for (const key of p.kpis.goalOppurtiny) {
    const obj = {}
    obj.KPI = key
    for (const playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    goalkpis.push(obj)
  }
  result.Goal = goalkpis

  // Play spider
  const playkpis = []
  for (const key of p.kpis.playmaking) {
    const obj = {}
    obj.KPI = key
    for (const playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    playkpis.push(obj)
  }
  result.Play = playkpis

  // Def spider
  const defkpis = []
  for (const key of p.kpis.def) {
    const obj = {}
    obj.KPI = key
    for (const playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    defkpis.push(obj)
  }
  result.Def = defkpis

  // Sammanställning
  const overallkpis = []
  for (const key of p.kpis.overall) {
    const obj = {}
    obj.KPI = key
    for (const playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    overallkpis.push(obj)
  }
  result.Overall = overallkpis

  console.log(result)

  return result
}

export function updateField (clickedBox, setField) {
  setField(clickedBox.split(', '))
  console.log(clickedBox.split(', '))
}
