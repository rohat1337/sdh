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
                        <View style={styles.players_TO}>                     
                            <TouchableOpacity>
                                <View style={styles.players_V}>
                                    <View style={styles.players_V_L}>
                                        <Text style={styles.text_L}>{item.Player}</Text>
                                    </View>
                                    <View style={styles.players_V_R}>
                                        <Text style={styles.text_R}>{item.Team}</Text>
                                        <Text style={styles.text_R}>, </Text>
                                        <Text style={styles.text_R}>{item.Age}</Text>
                                        <Text style={styles.text_R}>, </Text>
                                        <Text style={styles.text_R}>{item.Position}</Text>
                                    </View>
                                </View>
                                
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: "white"
    },
    root_left: {
        flex: 0.5,
        alignItems:"center",
        marginVertical: "5%"
    },
    root_right: {
        flex:0.5,
        backgroundColor: "yellow"
    },
    players_TO: {
        width: windowWidth/4,
        marginVertical: "2%",
        alignItems:"center",
        height: windowHeight/14,
        borderRadius: 100,
        backgroundColor: "#0059a1",
    },
    players_V: {
        flexDirection: "row",
    },
    players_V_L: {
        flexDirection: "row",
        width: windowWidth/12,
        alignItems: "center",
        justifyContent: "center",
    },
    players_V_R: {
        width:windowWidth/6,
        height: windowHeight/14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    text_L: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17
    },
    text_R: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12
    }
})

export default ChoosePlayer;
