
export function getPlayerStats(id) {
    try {
      return fetch(`http://localhost:5000/player/${id}`)
    } catch (error) {
      console.log(error)
    }
}

export function getSpecificStats(id, stats) {
  try {
    return fetch(`http://localhost:5000/specificData/${id}/${arrayToString(stats)}`)
  } catch (error) {
    console.log(error)
  }
}

function arrayToString(stats) {
  var result = "";
  
  stats.forEach(statsInArray => {
    result += statsInArray
    result += "$"
  });

  return result;
}

export const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
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

export function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}