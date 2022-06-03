import { Radar } from 'recharts'
import { positions, positionsArray } from './positions'
import { Dimensions } from 'react-native-web'

const _ = require('lodash')

const colors = ['#FFC1CF', '#E8FFB7', '#E2A0FF', '#C4F5FC', '#B7FFD8']

export function getPlayerStats (id) {
  try {
    return fetch(`http://localhost:5000/player/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export function getSpecificStats (id, stats) {
  try {
    return fetch(`http://localhost:5000/specificData/${id}/${arrayToString(stats)}`).then((response) => {
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

export function round_market_value (int) {
  return int / 1000000
}

export function fixPlayerPositions (position) {
  let result = []
  // var result = "";
  const arrayOfPositions = position.toLowerCase().split(', ')

  for (let index = 0; index < arrayOfPositions.length; index++) {
    if (arrayOfPositions[index] == 'gk') {
      result.push('MV')
    } else if (arrayOfPositions[index] == 'cf') {
      result.push('9')
    } else if (arrayOfPositions[index] == 'lw' || arrayOfPositions[index] == 'lmf' || arrayOfPositions[index] == 'lamf' || arrayOfPositions[index] == 'lwf') {
      result.push('7 (v)')
    } else if (arrayOfPositions[index] == 'rw' || arrayOfPositions[index] == 'rmf' || arrayOfPositions[index] == 'ramf' || arrayOfPositions[index] == 'rwf') {
      result.push('7 (h)')
    } else if (arrayOfPositions[index] == 'amf') {
      result.push('10')
    } else if (arrayOfPositions[index] == ('lcmf') || arrayOfPositions[index] == ('rcmf')) {
      result.push('8')
    } else if (arrayOfPositions[index] == ('dmf') || arrayOfPositions[index] == ('ldmf') || arrayOfPositions[index] == ('rdmf')) {
      result.push('6')
    } else if (arrayOfPositions[index] == 'lb' || arrayOfPositions[index] == ('lwb')) {
      result.push('WB (v)')
    } else if (arrayOfPositions[index] == 'rb' || arrayOfPositions[index] == ('rwb')) {
      result.push('WB (h)')
    } else if (arrayOfPositions[index] == 'lcb' || arrayOfPositions[index] == 'rcb' || arrayOfPositions[index] == 'cb') {
      result.push('MB')
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
    return fetch('http://localhost:5000/playersAllsvenskan')
  } catch (error) {
    console.log(error)
  }
}

export function getBasicStats () {
  try {
    return fetch('http://localhost:5000/BasicInfoPlayers')
  } catch (error) {
    console.log(error)
  }
}

export function getStatNames () {
  try {
    return fetch('http://localhost:5000/stats').then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function getSpecificStatsMultiID (ids, stats) {
  try {
    return fetch(`http://localhost:5000/specificDataMultiID/${arrayToString(ids)}/${arrayToString(stats)}`).then((response) => {
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
    return fetch(`http://localhost:5000/maxStats/${arrayToString(stats)}`)
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsForPosition (stats, position) {
  try {
    return fetch(`http://localhost:5000/maxStats/${arrayToString(stats)}/${position}`)
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsForPositionArray (stats, array) {
  try {
    return fetch(`http://localhost:5000/maxStatsFromArray/${arrayToString(stats)}/${arrayToString(array)}`)
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
    return (player.Foot == 'left')
  } else if (right && !left) {
    return (player.Foot == 'right')
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
      if (JSON.stringify(field) === JSON.stringify(position.positions)) {
        result = { position: position.positions, stats: [position.kpis.def, position.kpis.goalOppurtiny, position.kpis.playmaking, position.kpis.overall_fetch] }
      }
    }
    return result
  }
}

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
    return fetch(`http://localhost:5000/specificDataMultiID/${arrayToString(ids)}/${arrayOfArrayToString(stats)}`).then((response) => {
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
    return fetch(`http://localhost:5000/spider/${arrayToString(ids)}/${arrayOfArrayToString(stats)}`).then((response) => {
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
    return fetch(`http://localhost:5000/spider/${arrayToString(ids)}/${arrayToString(stats)}`).then((response) => {
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
    return fetch(`http://localhost:5000/spider/${arrayToString(ids)}/${arrayOfArrayToString(stats)}`).then((response) => {
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
    if (JSON.stringify(pos.positions) == JSON.stringify(position)) {
      p = pos
    }
  }

  // Goal Spider
  const goalkpis = []
  for (var key of p.kpis.goalOppurtiny) {
    var obj = {}
    obj.KPI = key
    for (var playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    goalkpis.push(obj)
  }
  result.Goal = goalkpis

  // Play spider
  const playkpis = []
  for (var key of p.kpis.playmaking) {
    var obj = {}
    obj.KPI = key
    for (var playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    playkpis.push(obj)
  }
  result.Play = playkpis

  // Def spider
  const defkpis = []
  for (var key of p.kpis.def) {
    var obj = {}
    obj.KPI = key
    for (var playerID of Object.keys(spiderData[key])) {
      obj[playerID] = spiderData[key][playerID]
    }
    defkpis.push(obj)
  }
  result.Def = defkpis

  // Sammanställning
  const overallkpis = []
  for (var key of p.kpis.overall) {
    var obj = {}
    obj.KPI = key
    for (var playerID of Object.keys(spiderData[key])) {
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
}
