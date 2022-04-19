import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import PlayerField from "./PlayerField"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MallCS(props) {

    console.log(props)

    return (
        <View>
            <PlayerField func={props.func} button={props.button} />
            <TouchableOpacity style={styles.graphButton}
            onPress={() => props.nav.navigate("Spider", { players: props.players, stats: props.stats, mall: true})}>
                <Text style={styles.text}>Spindel</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    graphButton: {
        height: windowHeight/8,
        width: windowWidth/10,
        backgroundColor:"gray",
        borderRadius: 20,
        justifyContent:"center"
    },
    text: {
        fontSize: windowHeight/40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "white",
        fontFamily: "VitesseSans-Book",
    }
})