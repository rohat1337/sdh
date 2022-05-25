import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground } from "react-native"
import Header from "../components/Header";
import { getStatNames, uncheckFieldBox, setMall, setMall2, updateField } from "../data";
import CSLowerHeader from "../components/CSLowerHeader";
import ManualCS from "../components/ManualCS";
import MallCS from "../components/MallCS";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ChooseStats(props) {
    var playersWithID = props.navigation.state.params.players;

    function changeField(positions) {
        updateField(positions, setField)
    }

    
    // States
    const [field, setField] = useState([])
    const [button, setButton] = useState(false) // True: Manual | False: Mall
    const [stats, setStats] = useState(null)
    const [pos, setPos] = useState(null)

    useEffect(() => {
        // TODO: Only choose one position on field.
        if (field.length === 0) {} else {
            var res = setMall2(field)
            setStats(res.stats)
            setPos(res.position)
        }
    }, [field])

    if (button) {
        return (
            <View style={{flexDirection:"column"}}>

            <Header header={styles.header} stackIndex={1} nav={props.navigation} />
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">

                {/* Välj KPI:er eller mallar (header) */}
                <View>
                    <CSLowerHeader setButton={setButton} button={button}/>
                    <ManualCS nav={props.navigation} players={playersWithID} />
                </View>

            </ImageBackground>
            </View>
        )
    } else {
        return (
            <View style={{flexDirection:"column"}}>

            <Header header={styles.header} stackIndex={1} nav={props.navigation} />
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode="cover">

                {/* Välj KPI:er eller mallar (header) */}
                <View>
                    <CSLowerHeader setButton={setButton} button={button}/>
                    <MallCS func={changeField} pos={pos} field={field} button={button} stats={stats} nav={props.navigation} players={playersWithID} />
                </View>
            </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight - windowHeight/10,
        flexDirection: "row",
        backgroundColor:"#001324",
    },
    header: {
        opacity: .9,
        justifyContent:"center", 
        alignItems:"center", 
        height: windowHeight/10, 
        backgroundColor:"#001324", 
        textAlign:"center", 
        flexDirection: "row"
    },
    secondHeader: {
        width: windowWidth,
        height: windowHeight*0.1,
        backgroundColor:"red",
        flexDirection:"row"
    }
})

export default ChooseStats;