import Header from '../components/Header'
import Footer from '../components/Footer'
import { View, StyleSheet, ImageBackground, Dimensions, Text } from 'react-native'
import { useEffect, useState } from 'react'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function XYPlot (props) {
    return (
        <View>
            
        </View>
    )

}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight * 0.8,
        flexDirection: 'column',
        backgroundColor: '#001324'
    },
    header: {
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight / 10,
        backgroundColor: '#001324',
        textAlign: 'center',
        flexDirection: 'row'
      }
})