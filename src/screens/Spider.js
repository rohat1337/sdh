import Header from "../components/Header"
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useEffect } from "react";
import { getSpecificStats } from "../data";
import { indexOf } from "lodash";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Spider(props) {

    useEffect(() => {
        
        
    }, [])

    return(
        <View>
            <Header stackIndex={2} nav={props.navigation} header={styles.header}/>
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">
            {/*
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
            */}
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