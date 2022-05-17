import React from "react"
import {View, Text, StyleSheet, Dimensions} from "react-native"
import {fixSuffix} from "../data"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function PositionRanking({position, value, total}) {
    return (
        <View style={{flexDirection:"row", width:"100%"}}>

            <View style={{flex:0.2}}>
                <Text style={styles.small_text}>{position}: </Text>
            </View>

            <View style={{flex:0.8}}>
                <Text style={styles.small_text}>{value}{fixSuffix(value)} av {total} spelare</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    small_text: {
        fontSize:windowWidth / 50,
        fontWeight:"bold",
        fontFamily:"VitesseSans-Book",
        color:"white",
    }
})