import react from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground } from "react-native"
import InfoSquare from "../components/Dashboard/Infosquare";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Dashboard(props) {
    const { navigation } = props
    return(
        <View style={{flexDirection: "column"}}>

            {/* Put header here */}
            <View style={{height: windowHeight/10}}>
                <TouchableOpacity onPress={() => navigation.getParam('nav', "no nav").navigate('ChoosePlayer')}>
                    <Text style={{fontSize: 30}}>Back</Text>
                </TouchableOpacity>
            </View>

            {/* Put content here (This view is divided into 4 parts, row) */}
            <View style={{height: windowHeight - windowHeight/10, flexDirection: "row"}}>
                {/* Leftmost view, inforutan + 10 viktigaste mätpunkterna*/}
                <View style={{flex: 0.25, flexDirection: "column"}}>

                    {/* Inforutan */}
                    <View style={{flex: 0.4, margin:"5%", flexDirection: "column"}}>
                        <InfoSquare player={navigation.getParam("players", "default")}/>
                    </View>

                    {/* Viktigaste mätpunkterna */}
                    <View style={{flex: 0.6, backgroundColor: "red", margin: "5%"}}>

                    </View>

                </View>

                {/* Skapa målchans */}
                <View style={{flex: 0.25, backgroundColor: "blue"}}>

                </View>

                {/* Speluppbyggnad */}
                <View style={{flex: 0.25, backgroundColor: "yellow"}}>

                </View>

                {/* Försvarsspel */}
                <View style={{flex: 0.25, backgroundColor: "red"}}>

                </View>
            </View>
        </View>
        
    )
}

export default Dashboard;