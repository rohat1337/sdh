import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, } from 'react-native'
import { arrayRemove, sirius_players_stats } from '../data'
import Trendline from './Trendline'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function StatsChooser(props) {
    
    const [stats, setStats] = useState([])
    const [selectedStats, setSelectedStats] = useState([])

    useEffect(() => {
        sirius_players_stats().then((data) => {
            setStats(data[1].stats)
        })
    }, [])

    if (props.player == null) {
        return null
    } else {
        return (
            <View style={{ flexDirection: 'row'}}>

                <View style={styles.left}>

                    <FlatList
                    data={stats}
                    renderItem={({ item }) => {
                        const backgroundColor = selectedStats.includes(item) ? '#0059a1' : '#001a30'
                        return (
                            <TouchableOpacity style={[styles.statButton, {backgroundColor: backgroundColor}]}
                            onPress={() => {
                                if (selectedStats.includes(item)) {
                                    setSelectedStats(arrayRemove(selectedStats, item))
                                } else {
                                    setSelectedStats([...selectedStats, item])
                                }
                            }}>
                                <Text style={styles.text}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }} />

                </View>
                <View style={styles.right}>

                    <Trendline stats={selectedStats} player={props.player} />


                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    statButton: {
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
    left: {
        width: windowWidth* 0.25,
        height: windowHeight*0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        width: windowWidth* 0.5,
        height: windowHeight*0.8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})