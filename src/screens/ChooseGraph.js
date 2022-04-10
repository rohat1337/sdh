import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Text } from "react-native"
import Header from "../components/Header"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ChooseGraph(props) {
    return (
        <View style={{flexDirection:"column"}}>
            <Header stackIndex={2} nav={props.navigation} header={styles.header}/>
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">
                <View style={styles.graphs}>
                    <TouchableOpacity style={styles.graphButton}>
                        <Text style={styles.text}>Spindel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.graphButton}>
                        <Text style={styles.text}>Stapel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.graphButton}>
                        <Text style={styles.text}>X/Y-diagram</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight - windowHeight/10,
        backgroundColor:"#001324",
        alignItems:"center"
    },
    header: {
        opacity: .9,
        justifyContent:"center", 
        alignItems:"center", 
        height: windowHeight/10, 
        backgroundColor:"#001324", 
        textAlign:"center", 
        flexDirection: "row",
        width: windowWidth
    },
    graphs: {
        width: windowWidth*0.8,
        height: windowHeight/5,
        borderRadius: 20,
        marginTop: "2%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    graphButton: {
        height: windowHeight/7,
        width: windowWidth/6,
        backgroundColor:"gray",
        marginHorizontal: "2%",
        borderRadius: 20,
        justifyContent:"center"
    },
    text: {
        fontSize: windowHeight/40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "white",
        fontFamily: "VitesseSans-Book",
    },
})