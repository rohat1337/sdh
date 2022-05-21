import { Dimensions } from "react-native-web"
import config from "./config.json";
function arrayToString(stats) {
  var result = "";

  stats.forEach(statsInArray => {
    result += statsInArray
    result += "$"
  });

  return result;
}

export function getPlayerStats(id) {
  try {
    return fetch(config.SERVER_URL + `player/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export function getSpecificStats(id, stats) {
  try {
    return fetch(config.SERVER_URL + `specificData/${id}/${arrayToString(stats)}`)
  } catch (error) {
    console.log(error)
  }
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

//skicka tillbaka rätt ändelse för en given siffra
//
// talet mod 10 ger ett resultat
// resultat 1 och 2 returnerar :a eftersom 'första' och 'andra'
// resultat 3 och resten returnerar :e eftersom 'tredje' osv
// med undantag 11 (11 mod 10 == 1) som också returnerar :e
export function fixSuffix(int) {
  console.log("int: ", int)
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
  return result.join(", ")

}

export function uncheckFieldBox(field, box) {
  box = box.replace("0", "").split(", ")
  return field.filter(ele => !box.includes(ele))
}

export function allsvenskanPlayers() {
  try {
    return fetch(config.SERVER_URL + `playersAllsvenskan`)
  } catch (error) {
    console.log(error)
  }
}

export function getBasicStats() {
  try {
    return fetch(config.SERVER_URL + `BasicInfoPlayers`)
  } catch (error) {
    console.log(error)
  }
}

export function getStatNames() {
  try {
    return fetch(config.SERVER_URL + `stats`)
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

export function getMaxStatsAll(stats) {
  try {
    return fetch(config.SERVER_URL + `maxStats/${arrayToString(stats)}`)
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsForPosition(stats, position) {
  try {
    return fetch(config.SERVER_URL + `maxStats/${arrayToString(stats)}/${position}`)
  } catch (error) {
    console.log(error)
  }
}

export function getMaxStatsForPositionArray(stats, array) {
  try {
    return fetch(config.SERVER_URL + `maxStatsFromArray/${arrayToString(stats)}/${arrayToString(array)}`)
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

