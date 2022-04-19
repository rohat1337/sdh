import Header from "../components/Header"
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from "react";
import { getSpecificStatsMultiID, renderRadars } from "../data";
import { indexOf } from "lodash";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Spider(props) {

    // States
    const [spiderData, setSpiderData] = useState(null)
    const [radars, setRadars] = useState(null)

    useEffect(() => {
        setRadars(renderRadars(props.navigation.state.params.players))
        var ids = []
        for (var player of props.navigation.state.params.players) {
            ids.push(player.ID)
        }
        getSpecificStatsMultiID(ids, props.navigation.state.params.stats[0]).then((data) => {
            if (data[0] === 200) {
                data = data[1]
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
        })
    }, [])

    return(
        <View>
            <Header stackIndex={2} nav={props.navigation} header={styles.header}/>
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={spiderData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="KPI" fontFamily="VitesseSans-Book" fontWeight={"bold"} tick={{ fill: "white"}}/>
                <PolarRadiusAxis />
                {radars}
                <Legend />
                </RadarChart>
            </ResponsiveContainer>

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