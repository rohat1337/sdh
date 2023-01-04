import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground } from 'react-native'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { sirius_players_names } from '../data'
import StatsChooser from './SPStatsChooser'
import './background.css'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function SiriusPlayers(props) {

    const [siriusNames, setSiriusNames] = useState([])
    const [selectedName, setSelectedName] = useState(null)

    useEffect(() => {
        sirius_players_names().then((data) => {
            if (data[0] === 200) {
                data = data[1]
                setSiriusNames(data.names)
            }
        })
    }, [])

    return (
        <View style={{ flexDirection: 'column'}}>
            <Header
            header={styles.header}
            nav={props.navigation}
            stackIndex={4} />
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode='cover'>

                <View style={styles.rootLeft}>

                    <FlatList
                    data={siriusNames}
                    renderItem={({ item }) => {
                        const backgroundColor = selectedName == item ? '#0059a1' : '#001a30'
                        return(
                            <TouchableOpacity
                            style={[styles.nameButton, { backgroundColor: backgroundColor}]}
                            onPress={() => {
                                if (selectedName == item) {
                                    setSelectedName(null)
                                } else {
                                    setSelectedName(item)
                                }
                            }} >
                                <Text style={styles.text}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }} />

                </View>

                <View style={styles.rootRest}>
                    <StatsChooser player={selectedName} />
                </View>

            </ImageBackground>

            <Footer />

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight * 0.8,
        flexDirection: 'row',
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
    },
    rootLeft: {
        width: windowWidth*0.25,
        height: windowHeight*0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameButton: {
        width: windowWidth * 0.2,
        height: windowHeight * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: windowWidth / 100,
        backgroundColor: "#001a30"
    },
    text: {
        fontSize: windowHeight / 50,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'VitesseSans-Book'
    },
    rootRest: {
        width: windowWidth*0.75,
        height: windowHeight*0.8,
        justifyContent: 'center',
        // alignItems: 'center',
    }
})