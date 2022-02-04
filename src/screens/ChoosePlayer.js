import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { getBasicStats, zip } from "../data"

function ChoosePlayer() {

    const [players, setPlayers] = useState([])
    
    
    
    // Load all basic stats on startup
    useEffect(() => {
        getBasicStats() // Fetch
        .then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then((data) => {
            data = data[1]
            var result = []
            var keys = Object.keys(data)
            // Get lists of all names, team names etc..
            var ar1 = Object.values(data["Player"])
            var ar2 = Object.values(data["Team"])
            var ar3 = Object.values(data["Position"])
            var ar4 = Object.values(data["Age"])
            var ar = zip(ar1, ar2, ar3, ar4)
            // For every player, create object
            // This is only needed because of format issues from flask (no object propety names to access)
            for (var x of ar) {
                var obj = {}
                var i = 0;
                for (var y of keys) {
                    obj[y] = x[i]
                    i++
                }
                result.push(obj)
            }
            setPlayers(result)
        })
    }, [])


    return (
        <View>
            <FlatList
            data={test}
            renderItem={({ item }) => {
                return (
                    <View>
                        <Text>{item.Player}</Text>
                        <Text>{item.Team}</Text>
                    </View>
                )
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default ChoosePlayer;
