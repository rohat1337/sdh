import Header from "../components/Header"
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Text } from "react-native"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Label } from 'recharts';
import { useEffect, useState } from "react";
import { getSpecificStatsMultiID, renderRadars, setSpiders, testSpiderFetch, fixSpiderData } from "../data";
import _ from "lodash";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Spider(props) {

    // States
    const [spiderData, setSpiderData] = useState(null)
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
                setTestSpiderData(fixSpiderData(data[1]))
            })
            //setSpiders(statsAndIDs["stats"], statsAndIDs["ids"])
        }
    }, [statsAndIDs])


    useEffect(() => {
        setRadars(renderRadars(props.navigation.state.params.players))
        var ids = []
        for (var player of props.navigation.state.params.players) {
            ids.push(player.ID)
        }
        setIDsAndStats({"stats": props.navigation.state.params.stats, "ids": ids})
        /*
        getSpecificStatsMultiID(ids, props.navigation.state.params.stats[0]).then((data) => {
            if (data[0] === 200) {
                data = data[1]
                setIDsAndStats({"stats": props.navigation.state.params.stats, "ids": ids})
                var spider = []
                for (var key of props.navigation.state.params.stats[0]) {
                    var obj = {}
                    obj["KPI"] = key
                    spider.push(obj)
                }
                for (var ob of spider) {
                    for (var id of Object.keys(data[ob["KPI"]])) {
                        ob[id] = data[ob["KPI"]][id]
                    }
                }
                setSpiderData(spider)
            }
        })*/

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
                <Header stackIndex={2} nav={props.navigation} header={styles.header}/>
                <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">
                <ResponsiveContainer width="50%" height="50%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={testSpiderData["Goal"]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="KPI" fontFamily="VitesseSans-Book" fontWeight={"bold"} tick={{ fill: "white"}}/>
                    {radars}
                    <Legend />
                    </RadarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="50%" height="50%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={testSpiderData["Play"]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="KPI" fontFamily="VitesseSans-Book" fontWeight={"bold"} tick={{ fill: "white"}}/>
                    {radars}
                    <Legend />
                    </RadarChart>
                </ResponsiveContainer>
    
                </ImageBackground>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight - windowHeight/10,
        flexDirection: "row",
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
    }
})