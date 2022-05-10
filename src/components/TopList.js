import {useState, useEffect} from 'react'
import { getTopList } from "../data"
import {Dimensions, FlatList, View, Text, StyleSheet} from "react-native"

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function TopList({position = "CB"}) {

    const [playersList, setPlayersList] = useState([])

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
            <View style={{width:"65%", height:"100%", backgroundColor:"green"}}>
                <Text style={{fontSize:30, textAlign:"center", fontFamily:"VitesseSans-Book"}}>
                    Loading...
                </Text>
            </View>
        )
    } else {
        return (
            <View style={{height:"65%"}}>
                <FlatList data={playersList}
                          renderItem={({ item, index }) => {
                                <View style={styles.player}>
                                    <Text>{item["Player"]}</Text>
                                </View>
                          }}
                          keyExtractor={(item, index) => index.toString()}>
    
                </FlatList>
            </View>
        )
    }
    

}

const styles = StyleSheet.create({
    player: {
        width:"100%",
        height: windowHeight / 20,
        marginVertical: windowWidth / 80,
    }
});