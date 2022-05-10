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
                    <View style={{flexDirection:"row", height:"100%"}}>

                        <View style={{flex: 0.4, flexDirection:"column", marginHorizontal:"2%", height:"100%"}}>

                            <View style={{flex:0.4, textAlign:"center"}}>
                                <Text style={styles.small_text}>{ratingObj["Player"]}, {ratingObj["Age"]}</Text>
                                <Text style={styles.small_text}>{ratingObj["Team"]}</Text>
                                <Text style={styles.small_text}>{ratingObj["Position"]}</Text>
                            </View>

                            <View style={{flex: 0.6, height:"100%"}}>

                            </View>
                            
                        </View>
                        <View style={{flex: 0.6, flexDirection:"row", marginHorizontal:"5%", height:"100%", justifyContent:"space-around"}}>
                            {ratingObj["Rating as CB"] != null ? 
                            <View style={{flexDirection:"column", textAlign:"center", paddingHorizontal:"5%"}}>
                                <Text style={styles.small_text}>MB</Text>
                                <CircularProgress progress={ratingObj["Rating as CB"]}/>
                            </View>: null}

                            {ratingObj["Rating as WB"] != null ?
                            <View style={{flexDirection:"column", textAlign:"center", paddingHorizontal:"5%"}}>
                                <Text style={styles.small_text}>WB</Text>
                                <CircularProgress progress={ratingObj["Rating as WB"]}/>
                            </View>: null}

                            {ratingObj["Rating as SIX"] != null ?
                            <View style={{flexDirection:"column", textAlign:"center", paddingHorizontal:"5%"}}>
                                <Text style={styles.small_text}>SEXA</Text>
                                <CircularProgress progress={ratingObj["Rating as SIX"]}/>
                            </View>: null}

                            {ratingObj["Rating as EIGHT"] != null ?
                            <View style={{flexDirection:"column", textAlign:"center", paddingHorizontal:"5%"}}>
                                <Text style={styles.small_text}>ÅTTA</Text>
                                <CircularProgress progress={ratingObj["Rating as EIGHT"]}/>
                            </View>: null}

                            {ratingObj["Rating as SEVEN"] != null ? 
                            <View style={{flexDirection:"column", textAlign:"center", paddingHorizontal:"5%"}}>
                                <Text style={styles.small_text}>SJUA</Text>
                                <CircularProgress progress={ratingObj["Rating as SEVEN"]}/>
                            </View>: null}

                            {ratingObj["Rating as TEN"] != null ? 
                            <View style={{flexDirection:"column", textAlign:"center", paddingHorizontal:"5%"}}>
                                <Text style={styles.small_text}>TIA</Text>
                                <CircularProgress progress={ratingObj["Rating as TEN"]}/>
                            </View>: null}

                            {ratingObj["Rating as Nine"] != null ? 
                            <View style={{flexDirection:"column", textAlign:"center", paddingHorizontal:"5%"}}>
                                <Text style={styles.small_text}>NIA</Text>
                                <CircularProgress progress={ratingObj["Rating as NINE"]}/>
                            </View>: null}

                        </View>
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
        fontSize:50,
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