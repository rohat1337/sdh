import Header from "../components/Header"
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Text } from "react-native"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Label } from 'recharts';
import { useEffect, useState } from "react";
import { renderRadars, testSpiderFetch, fixSpiderData, fixSpiderData2 } from "../data";
import _ from "lodash";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Spider(props) {

    // States
    const [radars, setRadars] = useState(null)
    const [statsAndIDs, setIDsAndStats] = useState({})
    const [refreshDev, setRefreshDev] = useState(false)
    const [testSpiderData, setTestSpiderData] = useState(null)

    useEffect(() => {
        if (refreshDev) {
            if (!_.isEqual({}, statsAndIDs)) {
                testSpiderFetch(statsAndIDs["ids"], statsAndIDs["stats"]).then((data) => {
                    console.log(data)
                })
            }
        } setRefreshDev(false)
    }, [refreshDev])

    useEffect(() => {
        if (!_.isEqual({}, statsAndIDs)) {
            testSpiderFetch(statsAndIDs["ids"], statsAndIDs["stats"]).then((data)=> {
                setTestSpiderData(fixSpiderData2(data[1], props.navigation.state.params.pos))
            })
        }
    }, [statsAndIDs])


    useEffect(() => {
        setRadars(renderRadars(props.navigation.state.params.players))
        var ids = []
        for (var player of props.navigation.state.params.players) {
            ids.push(player.ID)
        }
        setIDsAndStats({"stats": props.navigation.state.params.stats, "ids": ids})

    }, [])

    if (testSpiderData ===  null) {
        return (
            <View>
                <TouchableOpacity style={{width: windowWidth, height: windowHeight*0.1, backgroundColor:"white"}}
                onPress={() => setRefreshDev(!refreshDev)}>
                    <Text>REFRESH DEV</Text>
                </TouchableOpacity>
                <Text>Loading...</Text>
            </View>
        )
    } else {

        return(
            <View>
                <Header stackIndex={2} nav={props.navigation} header={styles.header} />
                <ImageBackground style={styles.root} source={require("../imgs/iks.png")} resizeMode="cover">
                    <View >
                        <View style={styles.spdrs}>
                            <View style={{flexDirection:"column", marginVertical:"2%"}}>
                                <Text style={styles.text}>Skapa målchans</Text>
                                <ResponsiveContainer width={windowWidth/2} height={windowHeight/3}>
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={testSpiderData["Goal"]}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="KPI" fontFamily="VitesseSans-Book" fontWeight={"bold"} tick={{ fill: "white"}} fontSize={windowHeight*0.017}/>
                                    {radars}
                                    <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </View>
                            <View style={{flexDirection:"column", marginVertical:"2%"}}>
                                <Text style={styles.text}>Speluppbyggnad</Text>
                                <ResponsiveContainer width={windowWidth/2} height={windowHeight/3}>
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={testSpiderData["Play"]}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="KPI" fontFamily="VitesseSans-Book" fontWeight={"bold"} tick={{ fill: "white"}} fontSize={windowHeight*0.017}/>
                                    {radars}
                                    <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </View>

                        </View>

                        <View style={styles.spdrs}>
                            <View style={{flexDirection:"column", marginVertical:"2%"}}>
                                <Text style={styles.text}>Försvarsspel</Text>
                                <ResponsiveContainer width={windowWidth/2.5} height={windowHeight/3}>
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={testSpiderData["Def"]}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="KPI" fontFamily="VitesseSans-Book" fontWeight={"bold"} tick={{ fill: "white"}} fontSize={windowHeight*0.017}/>
                                    {radars}
                                    <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </View>
                            <View style={{flexDirection:"column", marginVertical:"2%"}}>

                            </View>

                        </View>
                        

                    </View>
                </ImageBackground>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight - windowHeight/10,
        flexDirection: "column",
        backgroundColor:"#001324",
    },
    header: {
        opacity: .9,
        justifyContent:"center", 
        alignItems:"center", 
        height: windowHeight/10, 
        backgroundColor:"#001324", 
        textAlign:"center", 
        flexDirection: "row"
    },
    spdrs: {
        flexDirection:"row",
        width:windowWidth,
        height:(windowHeight - windowHeight/10)/2,
        justifyContent:"space-evenly"
    },
    text: {
        fontSize: windowHeight/30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "white",
        fontFamily: "VitesseSans-Book",
    }
})