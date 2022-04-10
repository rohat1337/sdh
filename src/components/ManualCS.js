import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import { getStatNames, arrayRemove } from "../data";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ManualCS(props) {

    // States
    const [stats, setStats] = useState(null)
    const [selectedStats, setSelectedStats] = useState([])
    const [selectStat, setSelectStat] = useState(null)

    useEffect(() => {
        getStatNames().then((data) => {
            if (data[0] === 200) {
                data = data[1]
                setStats(data)
            }
        })
    }, [])

    useEffect(() => {
        if (selectStat != null) {
            if (selectedStats.includes(selectStat)) {
                setSelectedStats(arrayRemove(selectedStats, selectStat))
            } else {
                setSelectedStats([...selectedStats, selectStat])
            }
        }
        setSelectStat(null)
    }, [selectStat])

    return (
        <View style={styles.root}>
            <View style={styles.left}>
                <FlatList
                data={stats}
                renderItem={({ item }) => {
                    const backgroundColor = selectedStats.includes(item) ? "#0059a1" : "#001a30";
                    return(
                        <TouchableOpacity
                        style={[styles.statButton, { backgroundColor: backgroundColor }]}
                        onPress={() => setSelectStat(item)}>
                            <Text style={styles.text}>{item}</Text>
                        </TouchableOpacity>
                    )
                }}
                />
            </View>

            <View style={styles.right}>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: windowWidth*0.9,
        height: windowHeight*0.75,
        alignSelf:"center",
        justifyContent:"space-around",
        flexDirection:"row",
        alignItems:"center"
    },
    left: {
        height: windowHeight*0.75,
        width: windowWidth*0.3,
        alignItems:"center"
    },
    right: {
        height: windowHeight*0.75,
        width: windowWidth*0.5,
        backgroundColor:"black"
    },
    text: {
        fontSize: windowHeight/40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "white",
        fontFamily: "VitesseSans-Book",
    },
    statButton: { 
        width: windowWidth*0.25,
        height: windowHeight*0.1,
        justifyContent:"center", 
        alignItems:"center", 
        borderRadius: 100,
        marginVertical: windowWidth/70
    }
})