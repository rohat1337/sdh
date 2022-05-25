import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground } from "react-native"
import { getBasicStats, zip, arrayRemove, fix, uncheckFieldBox, updateField } from "../data"
import Slider from '@react-native-community/slider';
import PlayerField from "../components/PlayerField";
import Header from "../components/Header";

import { fixPlayerPositions } from "../data";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ChoosePlayer(props) {

    function changeField(positions) {
        updateField(positions, setField)
        {/*if (positions.includes("0")) {
            setField(uncheckFieldBox(field, positions))
        } else {
            setField([...field, ...positions.split(", ")])
        }*/}
    }

    const [field, setField] = useState([])
    const [players, setPlayers] = useState([])
    const [selectedPlayers, setSelectedPlayers] = useState([])
    const [selectedPlayersWithID, setSelectedPlayersWithID] = useState([])
    const [player, setPlayer] = useState(null)
    const [searchTeam, setTeam] = useState("")
    const [searchPosition, setPosition] = useState("")
    const [searchPlayer, setSearchPlayer] = useState("")
    //States for minutes played slider
    const [minutesPlayed, setMinutesPlayed] = useState(0)
    //Ålder states
    const [minAge, setMinAge] = useState(0)
    const [maxAge, setMaxAge] = useState(50)

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
                keys.push("ID")

                // Get lists of all names, team names etc..
                var ids = Object.keys(data["Player"])
                var players = Object.values(data["Player"])
                var teams = Object.values(data["Team within selected timeframe"])                               
                var position = Object.values(data["Position"])               
                var age = Object.values(data["Age"])
                var minutes = Object.values(data["Minutes played"])
                var list = zip(players, teams, position, age, minutes, ids)

                // For every player, create object
                // This is only needed because of format issues from flask (no object propety names to access)
                for (var player of list) {
                    var player_obj = {}
                    var info_index = 0;
                    for (var info of keys) {
                        player_obj[info] = player[info_index]
                        info_index++
                    }
                    result.push(player_obj)
                }
                setPlayers(result)
                setSearchPlayer("")

            })
    }, [])

    // Check if selected player is already chosen or not.
    useEffect(() => {
        if (player != null) {
            if (selectedPlayers.includes(player.Name)) {
                setSelectedPlayers(arrayRemove(selectedPlayers, player.Name))
                setSelectedPlayersWithID(arrayRemove(selectedPlayersWithID, player))
            } else {
                setSelectedPlayers([...selectedPlayers, player.Name])
                setSelectedPlayersWithID([...selectedPlayersWithID, player])
            }
        }
        setPlayer(null)
    }, [player])

    return (
        <View style={{ flexDirection: "column" }}>
            <Header header={styles.header} nav={props.navigation} stackIndex={0} players={selectedPlayersWithID} nextIsOK={selectedPlayers.length > 0 ? "white" : "gray"} />
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">

                <View style={styles.root_left}>
                    <FlatList
                        // Filter players by Name, Team, Age, Position and Minutes played
                        data={players.filter((player) => (fix(player["Player"].toLowerCase()).includes(searchPlayer.toLowerCase()) &&
                            player["Team within selected timeframe"].toLowerCase().includes(searchTeam.toLowerCase()) &&
                            (player["Age"] >= minAge && player["Age"] <= maxAge) &&
                            player["Position"].toLowerCase().includes(searchPosition.toLowerCase()) &&
                            player["Minutes played"] >= minutesPlayed) && 
                            (field.some(ele => player["Position"].toLowerCase().split(", ").includes(ele)
                            ) || field.length == 0))}




                        renderItem={({ item }) => {
                            const textColor = selectedPlayers.includes(item.Player) ? "#ffe00f" : "white";
                            return (
                                <View style={styles.players_TO}>
                                    <TouchableOpacity
                                        onPress={() => setPlayer({"Name": item.Player, "ID": item.ID})}>
                                        <View style={styles.players_V}>
                                            <View style={styles.players_V_L}>
                                                <Text style={[styles.text_L, { color: textColor }]}>{item["Player"]}</Text>
                                            </View>
                                            <View style={styles.players_V_R}>
                                                <Text style={[styles.text_R, { color: textColor }]}>{item["Team within selected timeframe"]}</Text>
                                                <Text style={[styles.text_R, { color: textColor }]}>, </Text>
                                                <Text style={[styles.text_R, { color: textColor }]}>{item["Age"]} år</Text>
                                                <Text style={[styles.text_R, { color: textColor }]}>, </Text>
                                                <Text style={[styles.text_R, { color: textColor }]}>{fixPlayerPositions(item["Position"])} </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }} />
                </View>
                <View style={styles.root_right}>
                    <View style={styles.filters_U}>
                        <TextInput
                            placeholder="Sök spelare..."
                            placeholderTextColor="white"
                            style={styles.search}
                            onChangeText={setSearchPlayer}
                            value={searchPlayer} />
                        <View style={styles.filters_UL}>
                            <TextInput
                                placeholder="Sök lag..."
                                placeholderTextColor="white"
                                style={styles.search_small}
                                onChangeText={setTeam} />
                            <View style={{ flex: 0.5, flexDirection: "column", height: "100%", alignItems: "center", marginLeft: "1%", marginTop: "2%" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <View style={{ flexDirection: "row", width: windowWidth / 10 }}>
                                            <Text style={styles.slider_text}>Ålder (min)</Text>
                                            <TextInput style={[styles.slider_text, { width: windowWidth / 30 }]}
                                                placeholder={minAge}
                                                value={minAge}
                                                onChangeText={value => setMinAge(value)} />
                                        </View>

                                        <Slider style={{ width: windowWidth / 9, height: windowHeight / 20 }}
                                            minimumValue={0}
                                            maximumValue={50}
                                            minimumTrackTintColor="#078efb"
                                            maximumTrackTintColor="gray"
                                            thumbTintColor="#078efb"
                                            value={0}
                                            onValueChange={value => setMinAge(parseInt(value))}>
                                        </Slider>
                                    </View>
                                    <View style={{ marginLeft: "10%" }}>
                                        <View style={{ flexDirection: "row", width: windowWidth / 10 }}>
                                            <Text style={styles.slider_text}>Ålder (max)</Text>
                                            <TextInput style={[styles.slider_text, { width: windowWidth / 30 }]}
                                                placeholder={maxAge}
                                                value={maxAge}
                                                onChangeText={value => setMaxAge(value)} />
                                        </View>

                                        <Slider style={{ width: windowWidth / 10, height: windowHeight / 20 }}
                                            minimumValue={0}
                                            maximumValue={50}
                                            minimumTrackTintColor="#078efb"
                                            maximumTrackTintColor="gray"
                                            thumbTintColor="#078efb"
                                            value={50}
                                            onValueChange={value => setMaxAge(parseInt(value))}></Slider>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.filters_UL}>
                            <TextInput
                                placeholder="Sök position..."
                                placeholderTextColor="white"
                                style={styles.search_small}
                                onChangeText={setPosition} />
                            <View style={{ flex: 0.5, alignItems: "center" }}>
                                <View style={{ flexDirection: "row", paddingTop: "5%" }}>
                                    <Text style={[styles.slider_text, { marginLeft: "15%" }]}>Spelade minuter</Text>
                                    <TextInput placeholder={0}
                                        value={minutesPlayed}
                                        style={styles.slider_text}
                                        onChangeText={value => setMinutesPlayed(value)} />
                                </View>
                                <Slider style={{ width: windowWidth / 4.5, height: windowHeight / 20, marginLeft: "5%" }}
                                    minimumValue={0}
                                    maximumValue={1}
                                    minimumTrackTintColor="#078efb"
                                    maximumTrackTintColor="gray"
                                    thumbTintColor="#078efb"
                                    value={0}
                                    onValueChange={value => setMinutesPlayed(parseInt(value * 2700))} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.filters_L}>
                        <PlayerField func={changeField} mall={false} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight - windowHeight / 10,
        flexDirection: "row",
        backgroundColor: "#001324",
    },
    root_left: {
        flex: 0.45,
        alignItems: "center",
        marginBottom: "5%",
        marginTop: "2%",
    },
    root_right: {
        flex: 0.55,
    },
    players_TO: {
        width: windowWidth / 3,
        marginLeft: windowWidth / 20,
        alignItems: "center",
        height: "75%",
        borderRadius: 100,
        backgroundColor: "#0059a1",

    },
    players_V: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: windowHeight / 50
    },
    players_V_L: {
        flexDirection: "row",
        width: windowWidth / 12,
        alignItems: "center",
        justifyContent: "center",
        flex: 0.45
    },
    players_V_R: {
        width: windowWidth / 4,
        height: windowHeight / 14,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: windowWidth / 60,
        flex: 0.55,
    },
    text_L: {
        color: "white",
        fontWeight: "bold",
        fontSize: windowWidth / 80,
        fontFamily: "VitesseSans-Book"
    },
    text_R: {
        color: "white",
        fontWeight: "bold",
        fontSize: windowWidth / 100,
        fontFamily: "VitesseSans-Book",
    },
    filters_U: {
        flex: 0.7,
        alignItems: "center"
    },
    filters_L: {
        flex: 0.3,
        alignItems: "center",
        marginBottom: "30%",

    },
    search: {
        paddingLeft: "2%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 50,
        width: "80%",
        marginTop: "3%",
        height: windowHeight / 14,
        fontSize: 17,
        fontWeight: "bold",
        backgroundColor: "gray",
        color: "white",
        fontFamily: "VitesseSans-Book",
        opacity: .9
    },
    filters_UL: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "80%",
        height: "20%",
        marginVertical: "2%",
    },
    filters_TO: {
        backgroundColor: "#0059a1",
        width: windowWidth / 4.5,
        height: windowHeight / 11,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    text_filters: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
        fontFamily: "VitesseSans-Book"
    },
    search_small: {
        flex: 0.5,
        paddingLeft: "2%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 50,
        width: "100%",
        height: "50%",
        fontSize: 17,
        fontWeight: "bold",
        backgroundColor: "gray",
        marginTop: "5%",
        color: "white",
        fontFamily: "VitesseSans-Book",
        opacity: .9
    },
    image: {
        flex: 1
    },
    slider_text: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        width: "100%",
        color: "white",
        fontFamily: "VitesseSans-Book",
        marginVertical: "1%",
    },
    header: {
        opacity: .9,
        justifyContent: "center",
        alignItems: "center",
        height: windowHeight / 10,
        backgroundColor: "#001324",
        textAlign: "center",
        flexDirection: "row"
    }
})

export default ChoosePlayer;
