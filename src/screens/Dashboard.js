import react, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground } from "react-native"
import Defensive_Actions from "../components/Dashboard/Defensive_Actions";
import Fasta_Situationer from "../components/Dashboard/Fasta_Sitatuationer";
import InfoSquare from "../components/Dashboard/Infosquare";
import Offensive_Actions from "../components/Dashboard/Offensive_Actions"
import Speluppbyggnad from "../components/Dashboard/Speluppbyggnad";
import Header from "../components/Header";
import Switch from 'react-switch';

import { getPlayerStats, getMaxStats } from "../data";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



function Dashboard(props) {

    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [maxOffensive, setMaxOffensive] = useState(null)
    const [maxSpeluppbyggnad, setMaxSpeluppbyggnad] = useState(null)
    const [maxDefensive, setMaxDefensive] = useState(null)
    const [maxFastaSituationer, setMaxFastaSituationer] = useState(null)

    useEffect(() => {
        getPlayerStats(props.navigation.getParam("player_id", "default"))
        .then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then((data) => {
            data = data[1]
            setSelectedPlayer(data)
        })

        //Dessa fetchas separat per array, kan nog slås ihop så vi bara behöver 1 fetch

        //fetch max offensive
        getMaxStats(offensive_actions)
        .then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then((data) => {
            data = data[1]
            setMaxOffensive(data)
        })

        //fetch max speluppbyggnad
        getMaxStats(speluppbyggnad)
        .then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then((data) => {
            data = data[1]
            console.log(data)
            setMaxSpeluppbyggnad(data)
        })

        //fetch max defensive actions
        getMaxStats(defensive_actions)
        .then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then((data) => {
            data = data[1]
            console.log(data)
            setMaxDefensive(data)
        })

        //fetch max fasta situationer
        getMaxStats(fasta_situationer)
        .then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then((data) => {
            data = data[1]
            console.log(data)
            setMaxFastaSituationer(data)
        })
    }, [])

    // /let playerFetch = getPlayerStats(navigation.getParam("player_id", "default"))



    //						Aerial duels per 90	Aerial duels won, %	Sliding tackles per 90	PAdj Sliding tackles			PAdj Interceptions	 90	Goals per 90	Non-penalty goals	Non-penalty goals per 90	xG per 90		Crosses per 90	Accurate crosses, %	Crosses from left flank per 90	Accurate crosses from left flank, %	Crosses from right flank per 90	Accurate crosses from right flank, %	Crosses to goalie box per 90	Dribbles per 90	Successful dribbles, %	Offensive duels per 90	Offensive duels won, %	Touches in box per 90	Progressive runs per 90	Accelerations per 90	Received passes per 90	Received long passes per 90	Fouls suffered per 90	Passes per 90	Accurate passes, %	Forward passes per 90	Accurate forward passes, %	Back passes per 90	Accurate back passes, %	Lateral passes per 90	Accurate lateral passes, %	Short / medium passes per 90	Accurate short / medium passes, %	Long passes per 90	Accurate long passes, %	Average pass length, m	Average long pass length, m	xA per 90	Shot assists per 90	Second assists per 90	Third assists per 90	Smart passes per 90	Accurate smart passes, %	Key passes per 90	Passes to final third per 90	Accurate passes to final third, %	Passes to penalty area per 90	Accurate passes to penalty area, %	Through passes per 90	Accurate through passes, %	Deep completions per 90	Deep completed crosses per 90	Progressive passes per 90	Accurate progressive passes, %	Conceded goals	Conceded goals per 90	Shots against	Shots against per 90	Clean sheets	Save rate, %	xG against	xG against per 90	Prevented goals	Prevented goals per 90	Back passes received as GK per 90	Exits per 90	Aerial duels per 90	Free kicks per 90	Direct free kicks per 90	Direct free kicks on target, %	Corners per 90	Penalties taken	Penalty conversion, %

    //Tagna från Adrians excelark
    let offensive_actions = ["Non-penalty goals per 90", "xG per 90", "Shots per 90", "Shots on target, %", "Assists per 90", "Crosses from left flank per 90", "Accurate crosses from left flank, %", "Crosses from right flank per 90", "Accurate crosses from right flank, %", "Dribbles per 90", "Successful dribbles, %", "Offensive duels per 90", "Offensive duels won, %", "Touches in box per 90", "Progressive runs per 90", "Accelerations per 90"]
    let speluppbyggnad = ["Received passes per 90", "Passes per 90", "Accurate passes, %", "Forward passes per 90", "Accurate forward passes, %", "Average pass length, m", "xA per 90", "Shot assists per 90", "Passes to final third per 90", "Accurate passes to final third, %", "Passes to penalty area per 90", "Accurate passes to penalty area, %", "Deep completions per 90", "Progressive passes per 90", "Accurate progressive passes, %"]
    let defensive_actions = ["Successful defensive actions per 90", "Defensive duels per 90", "Defensive duels won, %", "Aerial duels per 90", "Aerial duels won, %", "Sliding tackles per 90", "PAdj Sliding tackles", "Shots blocked per 90", "PAdj Interceptions"]
    let fasta_situationer = ["Free kicks per 90", "Direct free kicks per 90", "Direct free kicks on target, %", "Corners per 90", "Penalties taken", "Penalty conversion, %"]

    return (
        <View style={{ flexDirection: "column" }}>

            <Header header={styles.header} stackIndex={2} nav={props.navigation} />

            {/* Till senare: Hur ska man switcha mellan om man valt flera spelare innan man går till dashboarden*/}


            {/* Put content here (This view is divided into 4 parts, row) */}
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">
                {/* Leftmost view, inforutan + ... plan med positioner? */}
                <View style={{ flex: 0.25, height: windowHeight - windowHeight / 10}}>

                    {/* Inforutan */}
                    <View style={{ flex: 0.6, margin: "5%", flexDirection: "column"}}>
                        <InfoSquare player={selectedPlayer} />
                    </View>

                    {/* ... Checkboxes för att väljav vilka man ska jämföra med */}
                    <View style={{ flex: 0.4, margin: "5%" }}>
                        <input type="checkbox" />
                    </View>

                </View>

                {/* Offensiva aktioner */}
                <View style={{ flex: 0.25, height: windowHeight - windowHeight/10 }}>
                    <Text style={{fontSize:30, textAlign:"center", color:"white", fontFamily: "VitesseSans-Book"}}>Offensiva aktioner</Text>
                    <Offensive_Actions player={selectedPlayer} stats={offensive_actions} maxStats={maxOffensive}/>
                </View>

                {/* Speluppbyggnad */}
                <View style={{ flex: 0.25, height: windowHeight - windowHeight/10 }}>
                    <Text style={{fontSize:30, textAlign:"center", color:"white", fontFamily: "VitesseSans-Book"}}>Speluppbyggnad</Text>
                    <Speluppbyggnad player={selectedPlayer} stats={speluppbyggnad} maxStats={maxSpeluppbyggnad}/>
                </View>

                {/* Försvarsspel */}
                <View style={{ flex: 0.25, height: windowHeight - windowHeight/10 }}>
                    <View style={{flex: 0.6}}>
                        <Text style={{fontSize:30, textAlign:"center", color:"white", fontFamily: "VitesseSans-Book"}}>Defensiva aktioner</Text>
                        <Defensive_Actions player={selectedPlayer} stats={defensive_actions} maxStats={maxDefensive}/>
                    </View>

                    <View style={{flex: 0.4}}>
                        <Text style={{fontSize:30, textAlign:"center", color:"white", fontFamily: "VitesseSans-Book"}}>Fasta situationer</Text>
                        <Fasta_Situationer player={selectedPlayer} stats={fasta_situationer} maxStats={maxFastaSituationer}/>
                    </View>

                </View>
                </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        opacity: .9,
        justifyContent: "center",
        alignItems: "center",
        height: windowHeight / 10,
        backgroundColor: "#001324",
        textAlign: "center",
        flexDirection: "row"
    },
    root: {
        width: windowWidth,
        height: windowHeight - windowHeight / 10,
        flexDirection: "row",
        backgroundColor: "#001324",
    }
})

export default Dashboard;