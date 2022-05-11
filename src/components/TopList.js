import {useState, useEffect} from 'react'
import { getTopList } from "../data"
import {Dimensions, FlatList, View, Text, StyleSheet} from "react-native"

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function TopList({position, player}) {

    const [playersList, setPlayersList] = useState(null)
    var list_rank = 1

    useEffect(() => {
        getTopList(position)
        .then((response) => {
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
            .then((data) => {
                data = data[1]

                let id = 1
                for (const object in data) {
                    data[object]["id"] = id
                    id += 1
                }

                setPlayersList(data)
            })
        })
        

    }, [])

    if (playersList == null) {
        return (
            <View>
                <Text style={styles.rating_text}>
                    Loading...
                </Text>
            </View>
        )
    } else {

        

        return (
            <View style={{height:"100%", width:"100%"}}>
                <View>
                    <FlatList data={playersList}
                                renderItem={({item}) => {
                                const textColor = player == item["Player"] ? "#ffe00f" : "white";
                                return (
                                    <View style={styles.player}>
                                        <View style={{flex:0.8}}>
                                            <Text style={[styles.small_text, {color:textColor}]}>{item["id"]}. {item["Player"]}</Text>
                                        </View>
                                        <View style={{flex:0.2}}>
                                            <Text style={[styles.rating_text, {color:textColor}]}>{item["Rating as " + position]}</Text>
                                        </View>

                                        
                                    </View>)
                                    
                            }}>
                    </FlatList>
                </View>
            </View>
        )
    }
    

}

const styles = StyleSheet.create({
    player: {
        width:"100%",
        flexDirection:"row",
        marginVertical:"1%"
    },

    small_text: {
        fontSize:windowWidth / 90,
        fontFamily:"VitesseSans-Book",
        textAlign:"left"
    },

    rating_text: {
        fontSize:windowWidth / 90,
        color:"white",
        fontFamily:"VitesseSans-Book",
        textAlign:"right"
    },
});