import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

function InfoSquare(props) {

    return (
        <View>
            <Text>
                {props.player}
            </Text>
        </View>
    )

}

export default InfoSquare;