import { Radar, Scatter, Line } from 'recharts'
import { positions } from './positions'
import { Dimensions } from 'react-native-web'
import config from './config.json'
import MyDot from './components/MyDot'

const _ = require('lodash')

const colors = ['red', 'blue', 'yellow', 'green', 'purple']

// hosting
// const url = process.env.REACT_APP_SERVER

// development
const url = config.SERVER_URL



//function for fetching status of server with url = `${url}/status/ that uses the JWT token located in localstorage under key "access_token"
export function getStatus() {
  try {
    let token = localStorage.getItem("access_token");
    return fetch(`${url}/status`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  } catch (error) {
    console.log(error)
  }

}

export function getPlayerStats(id) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/player/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    });

  } catch (error) {
    console.log(error)
  }
}

export function getPlayerStatsRanked(id) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/playerRanked/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export function getSpecificStats(id, stats) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/specificData/${id}/${arrayToString(stats)}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    }).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function getSpecificStatsRanked(id, stats) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/specificDataRanked/${id}/${arrayToString(stats)}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    }).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

function arrayToString(stats) {
  let result = ''

  stats.forEach(statsInArray => {
    result += statsInArray
    result += '$'
  })

  return encodeURI(result)
}

function arrayOfArrayToString(statsArray) {
  let result = ''

  for (const mall of statsArray) {
    result += arrayToString(mall)
    result += '€'
  }
  return result
}

export function getFontSize() {
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

export function fix(str) {
  return str.replace('š', 's').replace('ć', 'c').replace('č', 'c').replace('ó', 'o')
}

// skicka tillbaka rätt ändelse för en given siffra
//
// talet mod 10 ger ett resultat
// resultat 1 och 2 returnerar :a eftersom 'första' och 'andra'
// resultat 3 och resten returnerar :e eftersom 'tredje' osv
// med undantag 11 (11 mod 10 === 1) som också returnerar :e
export function fixSuffix(int) {
  // undantag
  if (int === 11) {
    return ':e'
  }

  //
  const result = int % 10
  if (result === 1 || result === 2) {
    return ':a'
  } else {
    return ':e'
  }
}

export function roundMarketValue(int) {
  return int / 1000000
}

export function fixPlayerPositions(position) {
  let result = []
  // var result = "";
  const arrayOfPositions = position.toLowerCase().split(', ')

  for (let index = 0; index < arrayOfPositions.length; index++) {
    if (arrayOfPositions[index] === 'gk') {
      result.push('MV')
    }
    if (arrayOfPositions[index] === 'cf') {
      result.push('9')
    }
    if (arrayOfPositions[index] === 'lw' || arrayOfPositions[index] === 'lmf' || arrayOfPositions[index] === 'lamf' || arrayOfPositions[index] === 'lwf') {
      result.push('7 (v)')
    }
    if (arrayOfPositions[index] === 'rw' || arrayOfPositions[index] === 'rmf' || arrayOfPositions[index] === 'ramf' || arrayOfPositions[index] === 'rwf') {
      result.push('7 (h)')
    }
    if (arrayOfPositions[index] === 'amf' || arrayOfPositions[index] === 'ramf' || arrayOfPositions[index] === 'lamf') {
      result.push('10')
    }
    if (arrayOfPositions[index] === ('lcmf') || arrayOfPositions[index] === ('rcmf')) {
      result.push('8')
    }
    if (arrayOfPositions[index] === ('dmf') || arrayOfPositions[index] === ('ldmf') || arrayOfPositions[index] === ('rdmf')) {
      result.push('6')
    }
    if (arrayOfPositions[index] === 'lb' || arrayOfPositions[index] === ('lwb')) {
      result.push('WB (v)')
    }
    if (arrayOfPositions[index] === 'rb' || arrayOfPositions[index] === ('rwb')) {
      result.push('WB (h)')
    }
    if (arrayOfPositions[index] === 'lcb' || arrayOfPositions[index] === 'rcb' || arrayOfPositions[index] === 'cb') {
      result.push('MB')
    }
  }

  result.sort()
  result = [...new Set(result)]
  return result.join(', ')
}

export function uncheckFieldBox(field, box) {
  box = box.replace('0', '').split(', ')
  return field.filter(ele => !box.includes(ele))
}

export function allsvenskanPlayers() {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/playersAllsvenskan`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  } catch (error) {
    console.log(error)
  }
}

export function getBasicStats() {
  let token = localStorage.getItem("access_token");
  return fetch(`${url}/BasicInfoPlayers`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    }
  });
}

export function getStatNames() {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/stats`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    }).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function getTopList(position) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/top15/${position}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export function getSpecificStatsMultiID(ids, stats) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/specificDataMultiID/${arrayToString(ids)}/${arrayToString(stats)}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    }).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function statsForPositions(positions, stats) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/statsForPositions/${arrayToString(positions)}/${arrayToString(stats)}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    }).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function avgForPositions(positions, stats) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/averageForPositions/${arrayToString(positions)}/${arrayOfArrayToString(stats)}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    }).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsAll(stats) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/maxStats/${arrayToString(stats)}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsForPosition(stats, position) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/maxStats/${arrayToString(stats)}/${position}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsForPositionArray(stats, array) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/maxStatsFromArray/${arrayToString(stats)}/${arrayToString(array)}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  } catch (error) {
    console.log(error)
  }
}

export function getPlayerCount(positions) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/playerCount/${arrayToString(positions)}` , {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  } catch (error) {
    console.log(error)
  }
}

export function getPlayerCountAll() {
  let token = localStorage.getItem("access_token");
  return fetch(`${url}/playerCountAll/` , {
    method: 'GET',
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    }
  }); 
}

export function getPlayerRating(id) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/playerRating/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  } catch (error) {
    console.log(error)
  }
}

export function getPlayerRanking(id) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/playerRanking/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  } catch (error) {
    console.log(error)
  }
}

export function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return !_.isEqual(ele, value)
  })
}

export function filterArray(arr, value) {
  return arr.filter(function (ele) {
    return ele.toLowerCase().includes(value.toLowerCase())
  })
}
export function checkFoot(player, left, right) {
  if ((left && right) || (!left && !right)) {
    // ??
    return true
  } else if (left && !right) {
    return (player.Foot === 'left')
  } else if (right && !left) {
    return (player.Foot === 'right')
  }
}

export function contractToString(milliSeconds) {
  const expiryDate = new Date(milliSeconds)
  return expiryDate.toString().slice(3, 7) + expiryDate.toString().slice(10, 15)
}

export function renderRadars(players) {
  console.log(players)
  const radars = players.map((player) => {
    const color = colors[players.indexOf(player)]
    return (
      <Radar
        key={parseInt(player.index)}
        name={player.Player}
        dataKey={parseInt(player.index)}
        stroke={color}
        fill={color}
        fillOpacity={0.4}
      />
    )
  })
  return radars
}

export function renderAverageRadar(value) {
  return (
    <Radar
      key={value}
      name='Position Average'
      dataKey={value}
      stroke='white'
      fill='white'
      fillOpacity={0.8}
    />
  )
}

export function renderScatters(players) {
  const scatters = players.map((player) => {
    const color = colors[players.indexOf(player)]
    return (
      <Scatter shape={<MyDot clr={color} />} isAnimationActive={false} name={player.Player} fill={color} data={player.data} id={player.Player} />
    )
  })
  return scatters
}

export function setMall2(field) {
  if (field.length !== 0) {
    let result
    for (const position of positions) {
      if (JSON.stringify(field).toLowerCase() === JSON.stringify(position.positions).toLowerCase()) {
        result = { position: position.positions, stats: [position.kpis.def, position.kpis.goalOppurtiny, position.kpis.playmaking, position.kpis.overall_fetch] }
      }
    }
    return result
  }
}

export function spiderMall(ids, stats, pos) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/spiderMall/${arrayToString(ids)}/${arrayOfArrayToString(stats)}/${arrayToString(pos)}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    }).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function spiderManual(ids, stats, pos) {
  let token = localStorage.getItem("access_token");
  console.log(arrayToString(ids));
  console.log(arrayToString(stats));
  console.log(arrayToString(pos));
  try {
    return fetch(`${url}/spiderManual/${arrayToString(ids)}/${arrayToString(stats)}/${arrayToString(pos)}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    }).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}


// OBS FIX THIS
export function filteredPlayers(filters) {
  let token = localStorage.getItem("access_token");
  try {
    return fetch(`${url}/filterPlayers`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(filters)
    })
  } catch (error) {
    console.log(error)
  }
}

export function fixSpiderData2(spiderData, position) {
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

  return result
}

export function updateField(clickedBox, setField) {
  setField(clickedBox.split(', '))
}

export function countPlayersForPosition(field, players) {
  let counter = 0
  console.log('field:', field)
  for (const [key, value] of Object.entries(players)) {
    let done = false
    console.log('positions for player: ', value.Position.split(','))
    for (const pos of value.Position.toLowerCase().split(',')) {
      console.log('checking if ', field, ' includes ', pos.trim())
      if (field.includes(pos.trim()) && !done) {
        console.log('found match!!')
        counter = counter + 1
        done = true
      }
    }
  }
  return counter
}

export function getIDs(players) {
  const result = []
  for (const player of players) {
    result.push('' + player.index)
  }
  return result
}

export function findPlayerID (player, players) {
  for (const pl of players) {
    if (pl.Name === player) {
      return pl.id
    }
  }
}

export function sirius_players() {
  try {
    return fetch(`${url}/siriusplayers`).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function sirius_players_names() {
  try {
    return fetch(`${url}/siriusplayers/names`).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function sirius_players_stats() {
  try {
    return fetch(`${url}/siriusplayers/availablestats`).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function getNormalizedTrendlineData (requestContent) {
  try {
    return fetch(`${url}/siriusplayers/trendline/normalized`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestContent)
    }).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function getTrendlineData (requestContent) {
  try {
    return fetch(`${url}/siriusplayers/trendline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestContent)
    }).then((response) => {
      const statusCode = response.status
      const data = response.json()
      return Promise.all([statusCode, data])
    })
  } catch (error) {
    console.log(error)
  }
}

export function renderLines(stats, setLines) {
  const lines = stats.map((stat) => {
    const color = colors[stats.indexOf(stat)]
    return (
      <Line type="monotone" dataKey={stat} stroke={color} strokeWidth={2} />
    )
  })
  setLines(lines)
}