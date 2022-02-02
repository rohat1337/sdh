
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

export function allsvenskanPlayers() {
  try {
    return fetch(`http://localhost:5000/playersAllsvenskan`)
  } catch (error) {
    console.log(error)
  }
}