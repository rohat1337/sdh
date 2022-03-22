import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { FlatList } from 'react-native-web-hover';
import { Line } from "rc-progress"

function Defensive_Actions(props) {

    if (props.player == null || props.maxStats == null) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        return (
            <View style={{marginVertical: "2%"}}>
                <FlatList
                          data={props.stats}
                          renderItem={({ item }) => {

                            let progressColor = ""
                            var percentile = (Object.values(props.player[item]) / props.maxStats[item])
                            
                            if (percentile > 0.75) {
                                progressColor = "green"
                            } else if (percentile < 0.25) {
                                progressColor = "red"
                            } else {
                                progressColor = "yellow"
                            }
                            return(
                                <View style={{alignItems:"center", padding: "1%"}}>
                                    <Text style={styles.slider_text}>{item}: {Object.values(props.player[item])} </Text>
                                    <Line percent={percentile*100} strokeWidth="2" strokeColor={progressColor}/>
                                </View>
                            )
                }}></FlatList>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({

    slider_text: {
        fontSize: 17,
        textAlign: "center",
        width: "100%",
        color: "white",
        fontFamily: "VitesseSans-Book",
        marginVertical: "1%",
    }

})

export default Defensive_Actions;