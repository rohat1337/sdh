import {useState, useEffect} from 'react'
import { getTopList } from "../data"
import {Dimensions, FlatList, View, Text, StyleSheet} from "react-native"

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function TopList({position, player}) {

    const [playersList, setPlayersList] = useState(null)

    useEffect(() => {
        getTopList(position)
        .then((response) => {
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
            .then((data) => {
                data = data[1]
                setPlayersList(data)
            })
        })

    }, [])

    if (playersList == null) {
        return (
            <View>
                <Text style={{fontSize:30, textAlign:"center", fontFamily:"VitesseSans-Book"}}>
                    Loading...
                </Text>
            </View>
        )
    } else {



        return (
            <View style={{height:"100%", width:"100%", flexDirection:"column"}}>
                <View style={{flex:0.7}}>
                    <FlatList data={playersList}
                                renderItem={({item}) => {
                                const textColor = player == item["Player"] ? "#ffe00f" : "white";
                                return (
                                    <View style={styles.player}>
                                        <View style={{flex:0.8}}>
                                            <Text style={[styles.small_text, {color:textColor}]}>{item["Player"]}</Text>
                                        </View>
                                        <View style={{flex:0.2}}>
                                            <Text style={[styles.rating_text, {color:textColor}]}>{item["Rating as " + position]}</Text>
                                        </View>

                                        
                                    </View>)
                                    
                            }}>
                    </FlatList>
                </View>
                
                <View style={{flex:0.3}}>
                </View>
            </View>
        )
    }
    

}

const styles = StyleSheet.create({
    player: {
        width:"100%",
        flexDirection:"row",
    },

    small_text: {
        fontSize:windowWidth / 100,
        fontFamily:"VitesseSans-Book",
        textAlign:"left"
    },

    rating_text: {
        fontSize:windowWidth / 100,
        color:"white",
        fontFamily:"VitesseSans-Book",
        textAlign:"right"
    },
});