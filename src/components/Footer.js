import { View, Dimensions, StyleSheet } from "react-native";
import MyText from "./MyText";
import metadata from '../metadata.json'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function Footer(props) {
    return (
        <View style={styles.container}>
            <MyText text={`Version ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision}`} style={styles.whiteText}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight*0.1,
        backgroundColor:"#001324",
        justifyContent:"center",
        alignItems:"center"
    },
    whiteText: {
        color: "white"
    }
})