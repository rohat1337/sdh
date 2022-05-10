import { Dimensions } from "react-native-web"
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

export function getFontSize() {
  const windowWidth = Dimensions.get("window").width;

  if (windowWidth > 1800) {
    return 18
  } else {
    return 12
  }
}

export const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}

export function fix(str) {
  return str.replace('š', 's').replace('ć', 'c').replace('č', 'c').replace('ó', 'o')
}

export function round_market_value(int) {
  return int/1000000
}

export function fixPlayerPositions(position) {

  var result = [];
  // var result = "";
  var arrayOfPositions = position.toLowerCase().split(", ")


  for (let index = 0; index < arrayOfPositions.length; index++) {
    if (arrayOfPositions[index] == "gk") {

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
    return fetch(`http://localhost:5000/stats`)
  } catch (error) {
    console.log(error)
  }
}

export function getTopList(position) {
  try {
    return fetch(`http://localhost:5000/top15/${position}`)
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsAll(stats) {
  try {
    return fetch(`http://localhost:5000/maxStats/${arrayToString(stats)}`)
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsForPosition(stats, position) {
  try {
    return fetch(`http://localhost:5000/maxStats/${arrayToString(stats)}/${position}`)
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsForPositionArray(stats, array) {
  try {
    return fetch(`http://localhost:5000/maxStatsFromArray/${arrayToString(stats)}/${arrayToString(array)}`)
  } catch (error) {
    console.log(error)
  }
}

export function getPlayerCount(positions) {
  try {
    return fetch(`http://localhost:5000/playerCount/${arrayToString(positions)}`)
  } catch (error) {
    console.log(error)
  }
}

export function getPlayerCountAll() {
  try {
    return fetch(`http://localhost:5000/playerCountAll/`)
  } catch (error) {
    console.log(error)
  }
}

export function getPlayerRatings(id) {
  try {
    return fetch(`http://localhost:5000/playerRatings/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}

export function checkFoot(player, left, right) {
  if ((left && right) || (!left && !right)) {
    // ??
    return true 
  } else if (left && !right) {
    return (player["Foot"] == "left")
  } else if (right && !left) {
    return (player["Foot"] == "right")
  }
}

export function contractToString(milliSeconds){
  var expiryDate = new Date(milliSeconds)
  return expiryDate.toString().slice(3,7) + expiryDate.toString().slice(10,15)
}

