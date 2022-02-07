import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground } from "react-native"
import { getBasicStats, zip, arrayRemove, fix, uncheckFieldBox } from "../data"
import Slider from '@react-native-community/slider';
import PlayerField from "../components/PlayerField";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ChoosePlayer(props) {

    function changeField(positions) {
        if (positions.includes("0")) {
            setField(uncheckFieldBox(field, positions))
        } else {
            setField([...field, ...positions.split(", ")])
        }
    }

    const [field, setField] = useState([])
    const [players, setPlayers] = useState([])
    const [selectedPlayers, setSelectedPlayers] = useState([])
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
            // Get lists of all names, team names etc..
            var players = Object.values(data["Player"])
            var teams = Object.values(data["Team within selected timeframe"])
            var position = Object.values(data["Position"])
            var age = Object.values(data["Age"])
            var minutes = Object.values(data["Minutes played"])
            var list = zip(players, teams, position, age, minutes)
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
            if (selectedPlayers.includes(player)) {
                setSelectedPlayers(arrayRemove(selectedPlayers, player))
            } else {
                setSelectedPlayers([...selectedPlayers, player])
            }
        }
        setPlayer(null)
    }, [player])

    return (
        <View style={{flexDirection:"column"}}>
            <View style={{opacity: .9,justifyContent:"center", alignItems:"center", height: windowHeight/10, backgroundColor:"#001324", textAlign:"center"}}>
            <Text style={{fontSize: 50, fontWeight:"bold", color: "white"}}>IK Sirius Datahub</Text>
            </View>
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">

                <View style={styles.root_left}>
                    <FlatList
                    // Filter players by Name, Team, Age, Position and Minutes played
                    data={players.filter((player) => (fix(player["Player"].toLowerCase()).includes(searchPlayer.toLowerCase()) && 
                                                    player["Team within selected timeframe"].toLowerCase().includes(searchTeam.toLowerCase()) &&
                                                    (player["Age"] >= minAge && player["Age"] <= maxAge) &&
                                                    player["Position"].toLowerCase().includes(searchPosition.toLowerCase()) &&
                                                    player["Minutes played"] >= minutesPlayed) &&
                                                    (field.some(ele => player["Position"].toLowerCase().includes(ele)) || field.length == 0))}
                    renderItem={({ item }) => {
                        const textColor = selectedPlayers.includes(item.Player) ? "#ffe00f" : "white";
                        return (   
                            <View style={styles.players_TO}>                     
                                <TouchableOpacity
                                onPress={() => setPlayer(item.Player)}>
                                    <View style={styles.players_V}>
                                        <View style={styles.players_V_L}>
                                            <Text style={[styles.text_L, {color: textColor}]}>{item["Player"]}</Text>
                                        </View>
                                        <View style={styles.players_V_R}>
                                            <Text style={[styles.text_R, {color: textColor}]}>{item["Team within selected timeframe"]}</Text>
                                            <Text style={[styles.text_R, {color: textColor}]}>, </Text>
                                            <Text style={[styles.text_R, {color: textColor}]}>{item["Age"]}</Text>
                                            <Text style={[styles.text_R, {color: textColor}]}>, </Text>
                                            <Text style={[styles.text_R, {color: textColor}]}>{item["Position"]}</Text>
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
                        placeholderTextColor="white"
                        style={styles.search}
                        onChangeText={setSearchPlayer}
                        value={searchPlayer}/>
                        <View style={styles.filters_UL}>
                            <TextInput 
                            placeholder="Sök lag..."
                            placeholderTextColor="white"
                            style={styles.search_small}
                            onChangeText={setTeam}/>
                            <View style={{flex: 0.5, flexDirection: "column", height: "100%"}}>
                                <Text style={styles.slider_text}>Ålder</Text>
                                <View style={{flexDirection:"row"}}>
                                    <View>
                                        <Text style={styles.slider_text}>Minst</Text>
                                        <TextInput style={styles.slider_text}
                                                placeholder={minAge}
                                                value={minAge}
                                                onChangeText={value => setMinAge(value)}></TextInput>
                                        <Slider style={{ width: "100%", height: 40, marginRight: "2.5%"}} 
                                            minimumValue={0}
                                            maximumValue={50}
                                            minimumTrackTintColor="#078efb"
                                            maximumTrackTintColor="gray"
                                            thumbTintColor="#078efb"
                                            value={0}
                                            onValueChange={value => setMinAge(parseInt(value))}>
                                        </Slider>
                                    </View>
                                    <View>
                                        <Text style={styles.slider_text}>Högst</Text>
                                        <TextInput style={styles.slider_text}
                                                placeholder={maxAge}
                                                value={maxAge}
                                                onChangeText={value => setMaxAge(value)}></TextInput>
                                        <Slider style={{ width: "100%", height: 40, marginLeft: "2.5%"}} 
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
                                onChangeText={setPosition}/>
                            <View style={{flex: 0.5, alignItems:"center"}}>
                                <Text style={styles.slider_text}>Minst antal minuter</Text>
                                <TextInput placeholder={minutesPlayed}
                                        style={styles.slider_text}
                                        onChangeText={value => setMinutesPlayed(value)}/>
                                <Slider style={{ width: "100%", height: 40, marginLeft: "5%"}} 
                                    minimumValue={0}
                                    maximumValue={1}
                                    minimumTrackTintColor="#078efb"
                                    maximumTrackTintColor="gray"
                                    thumbTintColor="#078efb"
                                    value={0}
                                    onValueChange={value => setMinutesPlayed(parseInt(value*2700))}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.filters_L}>
                        <PlayerField func={changeField}></PlayerField>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight - windowHeight/10,
        flexDirection: "row",
        backgroundColor:"#001324",
    },
    root_left: {
        flex: 0.4,
        alignItems:"center",
        marginBottom: "5%",
        marginTop: "2%"
    },
    root_right: {
        flex:0.6,
    },
    players_TO: {
        width: "100%",
        marginVertical: "2%",
        alignItems:"center",
        height: "75%",
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
        fontSize: 17,
        textAlign: 'center',
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
        alignItems: "center",
    },
    search: {
        paddingLeft: "2%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 50,
        width: "80%",
        marginTop: "3%",
        height: windowHeight/14,
        fontSize: 17,
        fontWeight: "bold",
        backgroundColor: "gray",
        opacity: 0.9,
        color: "white",
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
        opacity: 0.9,
        fontWeight: "bold",
        marginTop: "5%",
        color: "white"
    },
    image: {
        flex: 1
    },
    slider_text: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        width: "100%"
    }
})

export default ChoosePlayer;
