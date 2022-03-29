import react, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground } from "react-native"
import Defensive_Actions from "../components/Dashboard/Defensive_Actions";
import Fasta_Situationer from "../components/Dashboard/Fasta_Sitatuationer";
import InfoSquare from "../components/Dashboard/Infosquare";
import Offensive_Actions from "../components/Dashboard/Offensive_Actions"
import Speluppbyggnad from "../components/Dashboard/Speluppbyggnad";
import Header from "../components/Header";
import { getPlayerStats, getMaxStatsAll, getMaxStatsForPosition } from "../data";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Dashboard(props) {

    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [maxStats, setMaxStats] = useState(null)
    // const [maxOffensive, setMaxOffensive] = useState(null)
    // const [maxSpeluppbyggnad, setMaxSpeluppbyggnad] = useState(null)
    // const [maxStats, setMaxDefensive] = useState(null)
    // const [maxStats, setMaxFastaSituationer] = useState(null)

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

        //fetch all stats
        getMaxStatsAll(all_stats)
        .then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then((data) => {
            data = data[1]
            setMaxStats(data)
        })
    }, [])

    useEffect(() => {
        if (selectedPlayer != null) {
            setMaxStats(getMaxStatsForPosition(all_stats, selectedPlayer["Position"][0]))
        }
        
    }, [maxStats])
    
    //Tagna från Adrians excelark
   
    let offensive_actions = ["Non-penalty goals per 90", "xG per 90", "Shots per 90", "Shots on target, %", "Assists per 90", "Crosses from left flank per 90", "Accurate crosses from left flank, %", "Crosses from right flank per 90", "Accurate crosses from right flank, %", "Dribbles per 90", "Successful dribbles, %", "Offensive duels per 90", "Offensive duels won, %", "Touches in box per 90", "Progressive runs per 90", "Accelerations per 90"]
    let speluppbyggnad = ["Received passes per 90", "Passes per 90", "Accurate passes, %", "Forward passes per 90", "Accurate forward passes, %", "Average pass length, m", "xA per 90", "Shot assists per 90", "Passes to final third per 90", "Accurate passes to final third, %", "Passes to penalty area per 90", "Accurate passes to penalty area, %", "Deep completions per 90", "Progressive passes per 90", "Accurate progressive passes, %"]
    let defensive_actions = ["Successful defensive actions per 90", "Defensive duels per 90", "Defensive duels won, %", "Aerial duels per 90", "Aerial duels won, %", "Sliding tackles per 90", "PAdj Sliding tackles", "Shots blocked per 90", "PAdj Interceptions"]
    let fasta_situationer = ["Free kicks per 90", "Direct free kicks per 90", "Direct free kicks on target, %", "Corners per 90", "Penalties taken", "Penalty conversion, %"]
    let all_stats = offensive_actions.concat(defensive_actions, fasta_situationer, speluppbyggnad)

    return (
        <View style={{ flexDirection: "column" }}>

            <Header header={styles.header} stackIndex={2} nav={props.navigation} />

            {/* Till senare: Hur ska man switcha mellan om man valt flera spelare innan man går till dashboarden*/}


            {/* Put content here (This view is divided into 4 parts, row) */}
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">
                {/* Leftmost view, inforutan + 10 viktigaste mätpunkterna*/}
                <View style={{ flex: 0.25, height: windowHeight - windowHeight / 10}}>

                    {/* Inforutan */}
                    <View style={{ flex: 0.5, margin: "5%", flexDirection: "column"}}>
                        <InfoSquare player={selectedPlayer} />
                    </View>

                    {/* Viktigaste mätpunkterna */}
                    <View style={{ flex: 0.5, flexDirection:"column", margin: "5%" }}>
                        <View style={{alignContent:"center", textAlign:"center", padding:"2%"}}>
                            <TouchableOpacity style={{backgroundColor:"blue"}} onPress={setMaxStats}>Försvarare</TouchableOpacity>
                        </View>
                        <View style={{alignContent:"center", textAlign:"center", padding:"2%"}}>
                            <TouchableOpacity style={{backgroundColor:"blue"}}>Mittfältare</TouchableOpacity>
                        </View>
                        <View style={{alignContent:"center", textAlign:"center", padding:"2%"}}>
                            <TouchableOpacity style={{backgroundColor:"blue"}}>Anfallare</TouchableOpacity>
                        </View>
                    </View>

                </View>

                {/* Offensiva aktioner */}
                <View style={{ flex: 0.25, height: windowHeight - windowHeight/10 }}>
                    <Text style={{fontSize:30, textAlign:"center", color:"white", fontFamily: "VitesseSans-Book"}}>Offensiva aktioner</Text>
                    <Offensive_Actions player={selectedPlayer} stats={offensive_actions} maxStats={maxStats}/>
                </View>

                {/* Speluppbyggnad */}
                <View style={{ flex: 0.25, height: windowHeight - windowHeight/10 }}>
                    <Text style={{fontSize:30, textAlign:"center", color:"white", fontFamily: "VitesseSans-Book"}}>Speluppbyggnad</Text>
                    <Speluppbyggnad player={selectedPlayer} stats={speluppbyggnad} maxStats={maxStats}/>
                </View>

                {/* Försvarsspel */}
                <View style={{ flex: 0.25, height: windowHeight - windowHeight/10 }}>
                    <View style={{flex: 0.6}}>
                        <Text style={{fontSize:30, textAlign:"center", color:"white", fontFamily: "VitesseSans-Book"}}>Defensiva aktioner</Text>
                        <Defensive_Actions player={selectedPlayer} stats={defensive_actions} maxStats={maxStats}/>
                    </View>

                    <View style={{flex: 0.4}}>
                        <Text style={{fontSize:30, textAlign:"center", color:"white", fontFamily: "VitesseSans-Book"}}>Fasta situationer</Text>
                        <Fasta_Situationer player={selectedPlayer} stats={fasta_situationer} maxStats={maxStats}/>
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