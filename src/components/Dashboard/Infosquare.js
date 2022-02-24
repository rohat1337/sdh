import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { getPlayerStats } from "../../data"

function InfoSquare(props) {

    console.log(props.player)

    if (props.player == null) {
        return (
            <View>
                <Text>Chilla</Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text>
                    Namn: {Object.values(props.player["Player"])}
                </Text>

                <Text>
                    Age: {Object.values(props.player["Age"])}
                </Text>

                <Text>
                    Lag: {Object.values(props.player["Team within selected timeframe"])}
                </Text>

                <Text>
                    Position: {Object.values(props.player["Position"])}
                </Text>

                <Text>
                    Längd: {Object.values(props.player["Height"])}
                </Text>

                <Text>
                    Vikt: {Object.values(props.player["Weight"])}
                </Text>

                <Text>
                    Marknadsvärde: {Object.values(props.player["Market value"])}
                </Text>
    
            </View>
        )
    }

}

export default InfoSquare;