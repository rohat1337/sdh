import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { FlatList } from 'react-native-web-hover';
import { Line } from "rc-progress"

function Offensive_Actions(props) {

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
                                <View style={{padding: "1%"}}>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={styles.slider_text_left}>{item}: {Object.values(props.player[item])}</Text>
                                        <Text style={styles.slider_text_right}>MAX: {props.maxStats[item]}</Text>
                                    </View>
                                    <Line percent={percentile*100} strokeWidth="2" strokeColor={progressColor}/>
                                </View>
                            )
                }}></FlatList>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({

    slider_text_left: {
        flex:0.75,
        fontSize: 12,
        textAlign: "left",
        color: "white",
        fontFamily: "VitesseSans-Book",
        marginVertical: "1%"
    },
    slider_text_right: {
        flex:0.25,
        fontSize: 12,
        textAlign: "right",
        color: "white",
        fontFamily: "VitesseSans-Book",
        marginVertical: "1%"
    }

})

export default Offensive_Actions;