import react, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from "react-native"
import Header from "../components/Header";
import { getPlayerRatings } from "../data";
import CircularProgress from "../components/CircularProgress"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Ratings(props) {

    const player_id = props.navigation.getParam("player_id", "default")
    const [ratingObj, setRatingObj] = useState(null)

    useEffect(() => {
        console.log("getting ratings for player_id: ", player_id)
        getPlayerRatings(player_id)
        .then((response) => {
            const statusCode = response.status;
            const data = response.json()
            return Promise.all([statusCode, data])
        })
        .then((data) => {
            console.log(data)
            data = data[1][0]
            setRatingObj(data)
            console.log(data)
        })
    }, [])

    if (ratingObj == null) {
        return (
        <View style={styles.root}>
            <Header header={styles.header} stackIndex={3} nav={props.navigation}></Header>
            <ImageBackground style={styles.content_root} source={require('../imgs/iks.png')} resizeMode="cover">
                <View>
                    <Text style={styles.loading}>Loading...</Text>
                </View>
            </ImageBackground>
        </View>)
    } else {
        return (
            <View style={styles.root}>
                <Header header={styles.header} stackIndex={3} nav={props.navigation}></Header>
                <ImageBackground style={styles.content_root} source={require('../imgs/iks.png')} resizeMode="cover">
                    <View style={{flexDirection:"row"}}>
                        {ratingObj["Rating as CB"] != null ? <CircularProgress progress={ratingObj["Rating as CB"]}/>: <Text>cock CB</Text>}
                        {ratingObj["Rating as WB"] != null ? <CircularProgress progress={ratingObj["Rating as WB"]}/>: <Text>cock WB</Text>}
                        {ratingObj["Rating as SIX"] != null ? <CircularProgress progress={ratingObj["Rating as SIX"]}/>: <Text>cock SIX</Text>}
                        {ratingObj["Rating as EIGHT"] != null ? <CircularProgress progress={ratingObj["Rating as EIGHT"]}/>: <Text>cock EIGHT</Text>}
                        {ratingObj["Rating as SEVEN"] != null ? <CircularProgress progress={ratingObj["Rating as SEVEN"]}/>: <Text>cock SEVEN</Text>}
                        {ratingObj["Rating as TEN"] != null ? <CircularProgress progress={ratingObj["Rating as TEN"]}/>: <Text>cock TEN</Text>}
                        {ratingObj["Rating as NINE"] != null ? <CircularProgress progress={ratingObj["Rating as NINE"]}/>: <Text>cock NINE</Text>}
                    </View>
                </ImageBackground>
            </View>
            )
    }

    
}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight,
        flexDirection:"column",
        
    },
    content_root: {
        width: windowWidth,
        height: windowHeight - windowHeight / 10,
        backgroundColor: "#001324",
        flexDirection:"column"
    },

    header: {
        opacity: .9,
        justifyContent: "center",
        alignItems: "center",
        height: windowHeight / 10,
        backgroundColor: "#001324",
        textAlign: "center",
        flexDirection: "row"
    },

    small_text: {
        fontsize:17,
        color:"white",
        fontFamily:"VitesseSans-Book"
    },

    loading: {
        fontSize:50,
        color:"white",
        fontFamily:"VitesseSans-Book"
    }

});

export default Ratings;