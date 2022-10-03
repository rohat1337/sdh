import { View, Dimensions, StyleSheet } from 'react-native'
import MyText from './MyText'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function XYToolTip ({ payload, active }) {
    if (active) {
        return (
            <View style={styles.container}>
                <MyText text={payload[0].name + ": " + payload[0].value}/>
                <MyText text={payload[1].name + ": " + payload[1].value}/>
                <MyText text={payload[2].value}/>
            </View>
        )
    }

    return null
}

const styles = StyleSheet.create({
    container: {
        minWidth: windowWidth*0.125,
        height: windowHeight*0.1,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#f5f5f5",
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"space-evenly",
        paddingHorizontal: windowWidth*0.01
    }
})