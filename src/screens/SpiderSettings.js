import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function SpiderSettings(props) {

    if (props.settingsPressed) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.container}>

                    <View style={styles.row}>

                        <Text style={styles.small_text}>Average: </Text>
                        <TouchableOpacity style={{ marginHorizontal: "3%"}} onPress={() => props.setAvgOn(true)}>
                            <Text style={[styles.small_text, { color: props.avgOn ? 'gold' : 'white'}]}>PÅ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: "3%"}} onPress={() => props.setAvgOn(false)}>
                            <Text style={[styles.small_text, { color: props.avgOn ? 'white' : 'gold'}]}>AV</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.row}>

                    </View>

                </View>
                <View style={styles.line} />
            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth*0.2,
        height: windowHeight*0.8,
        flexDirection:"column",
        alignItems: "center"
    },

    row: {
        flexDirection: "row",
        width: windowWidth*0.15,
        height: windowHeight*0.05,
        marginVertical: "10%",
        justifyContent: 'space-evenly'
    },

    small_text: {
        fontWeight: 'bold',
        fontSize: windowWidth*0.015,
        fontFamily: 'VitesseSans-Book',
        color:'white',
    },

    line: {
        width: 3,
        height: windowHeight*0.75,
        backgroundColor: 'gray',
        alignSelf: 'center'
    }
})

