import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput } from "react-native"
import { getBasicStats, zip, arrayRemove } from "../data"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ChoosePlayer() {

    const [players, setPlayers] = useState([])
    const [selectedPlayers, setSelectedPlayers] = useState([])
    const [player, setPlayer] = useState(null)
    const [searchPlayer, setSearchPlayer] = useState(null)
    const [filteredPlayers, setFilteredPlayers] = useState(null)
    
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
            setSearchPlayer("")
        })
    }, [])

    // Check if selected player is already chosen or not.
    useEffect(() => {
        if (player != null) {
            if (selectedPlayers.includes(player)) {
                setSelectedPlayers(arrayRemove(selectedPlayers, player))
            } else {
                setSelectedPlayers([...selectedPlayers, player])
            }
        }
        setPlayer(null)
    }, [player])

    //
    useEffect(() => {
        if (searchPlayer != "") {
            setFilteredPlayers(players.filter((player) => player.Player.includes(searchPlayer)))
        } else {
            setFilteredPlayers(players)
        }
    }, [searchPlayer])

    return (
        <View style={styles.root}>
            <View style={styles.root_left}>
                <FlatList
                data={filteredPlayers}
                renderItem={({ item }) => {
                    const textColor = selectedPlayers.includes(item.Player) ? "#ffe00f" : "white";
                    return (   
                        <View style={styles.players_TO}>                     
                            <TouchableOpacity
                            onPress={() => setPlayer(item.Player)}>
                                <View style={styles.players_V}>
                                    <View style={styles.players_V_L}>
                                        <Text style={[styles.text_L, {color: textColor}]}>{item.Player}</Text>
                                    </View>
                                    <View style={styles.players_V_R}>
                                        <Text style={[styles.text_R, {color: textColor}]}>{item.Team}</Text>
                                        <Text style={[styles.text_R, {color: textColor}]}>, </Text>
                                        <Text style={[styles.text_R, {color: textColor}]}>{item.Age}</Text>
                                        <Text style={[styles.text_R, {color: textColor}]}>, </Text>
                                        <Text style={[styles.text_R, {color: textColor}]}>{item.Position}</Text>
                                    </View>
                                </View>
                                
                            </TouchableOpacity>
                        </View>
                    )
                }}/>
            </View>
            <View style={styles.root_right}>
                <View style={styles.filters_U}>
                    <TextInput 
                    placeholder="Sök spelare..."
                    style={styles.search}
                    onChangeText={setSearchPlayer}
                    value={searchPlayer}/>
                    <View style={styles.filters_UL}>
                        <TouchableOpacity style={styles.filters_TO}>
                            <Text style={styles.text_filters}>LAG</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filters_TO}>
                            <Text style={styles.text_filters}>ÅLDER</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.filters_UL}>
                        <TouchableOpacity style={styles.filters_TO}>
                            <Text style={styles.text_filters}>POSITION</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filters_TO}>
                            <Text style={styles.text_filters}>SPELADE MINUTER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.filters_L}>

                </View>
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
        flex: 0.4,
        alignItems:"center",
        marginVertical: "5%"
    },
    root_right: {
        flex:0.6,
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
        fontSize: 14
    },
    filters_U: {
        flex: 0.5,
        alignItems: "center"
    },
    filters_L: {
        flex:0.5,
        backgroundColor: "blue"
    },
    search: {
        paddingLeft: "5%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 50,
        width: "80%",
        marginTop: "10%",
        height: windowHeight/14,
        fontSize: 17,
        fontWeight: "bold"
    },
    filters_UL: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "80%",
        marginVertical: "2%"
    },
    filters_TO: {
        backgroundColor: "#0059a1",
        width: windowWidth/4.5,
        height: windowHeight/11,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    text_filters: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17
    }
})

export default ChoosePlayer;
