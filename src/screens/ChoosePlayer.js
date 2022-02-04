import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native"
import { getBasicStats, zip } from "../data"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
        <View style={styles.root}>
            <View style={styles.root_left}>
                <FlatList
                data={players}
                renderItem={({ item }) => {
                    return (                        
                        <TouchableOpacity
                        style={styles.players_TO}>
                            <View style={styles.players_V}>
                                <Text>{item.Player}</Text>
                                <View style={styles.players_V_lower}>
                                    <Text>{item.Team}</Text>
                                    <Text>, </Text>
                                    <Text>{item.Age}</Text>
                                    <Text>, </Text>
                                    <Text>{item.Position}</Text>
                                </View>
                            </View>
                            
                        </TouchableOpacity>
                    )
                }}/>
            </View>
            <View style={styles.root_right}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight,
        flexDirection: "row",
        backgroundColor: "red"
    },
    root_left: {
        flex: 0.5,
        backgroundColor:"green",
        alignItems:"center",
        marginVertical: "5%"
    },
    root_right: {
        flex:0.5,
        backgroundColor: "yellow"
    },
    players_TO: {
        backgroundColor: "blue",
        alignItems: "center",
        width: windowWidth/3,
        marginVertical: "0.5%"
    },
    players_V: {
        flexDirection: "column",
        alignItems: "center"
    },
    players_V_lower: {
        flexDirection: "row",
        backgroundColor: "green",
        alignItems: "center"
    }
})

export default ChoosePlayer;
