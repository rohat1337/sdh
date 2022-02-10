import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground } from "react-native"
import Header from "../components/Header";
import { getStatNames } from "../data";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ChooseStats(props) {
    return (
        <View style={{flexDirection:"column"}}>

            <Header header={styles.header} stackIndex={1} nav={props.navigation} />
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">
                <View style={styles.root_l}>
                    
                       
                </View>
                <View style={styles.root_r}>

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
    header: {
        opacity: .9,
        justifyContent:"center", 
        alignItems:"center", 
        height: windowHeight/10, 
        backgroundColor:"#001324", 
        textAlign:"center", 
        flexDirection: "row"
    },
    root_l: {
        flex: 0.3,
    },
    root_r: {
        flex: 0.7,   
    },
})

export default ChooseStats;