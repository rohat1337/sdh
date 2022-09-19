import Header from '../components/Header'
import Footer from '../components/Footer'
import { View, StyleSheet, ImageBackground, Dimensions, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { getSpecificStatsMultiID } from '../data'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function XYPlot (props) {

    useEffect(() => {
        getSpecificStatsMultiID(props.navigation.state.params.ids, props.navigation.state.params.stats).then((data) => {
            if (data[0] === 200) {
                data = data[1]
                var result = []
                
            }
        })
    }, [])

    return (
        <View>
            <Header stackIndex={1} nav={props.navigation} header={styles.header} />
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode='cover'>

            </ImageBackground>
            <Footer />
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