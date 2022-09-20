import Header from '../components/Header'
import Footer from '../components/Footer'
import { View, StyleSheet, ImageBackground, Dimensions, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { getSpecificStatsMultiID, statsForPositions } from '../data'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function XYPlot (props) {

    const [scatterData, setScatterData] = useState([])

    useEffect(() => {
        statsForPositions(props.navigation.state.params.pos, props.navigation.state.params.stats).then((data) => {
            if (data[0] === 200) {
                data = data[1]
                let result = []
                for (var id of Object.keys(data[props.navigation.state.params.stats[0]])) {
                    var obj = {}
                    for (var key of props.navigation.state.params.stats) {
                        obj[key]= data[key][id]
                    }
                    result.push(obj)
                }
                setScatterData(result)
            }
            
        })
        // getSpecificStatsMultiID(props.navigation.state.params.ids, props.navigation.state.params.stats).then((data) => {
        //     if (data[0] === 200) {
        //         data = data[1]
        //         var result = []
                
        //     }
        // })
    }, [])

    return (
        <View>
            <Header stackIndex={1} nav={props.navigation} header={styles.header} />
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode='cover'>
            <View style={{justifyContent:'center', alignItems:'center', marginTop: "5%"}}>
                    <ResponsiveContainer width={windowWidth*0.75} height={windowHeight*0.65}>
                        <ScatterChart
                        width={windowWidth*0.7}
                        height={windowHeight*0.60}
                        >
                        <CartesianGrid />
                        <XAxis type="number" dataKey={props.navigation.state.params.stats[0]} tick={{ stroke: 'white'}}>
                            <Label value={props.navigation.state.params.stats[0]} offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis type="number" dataKey={props.navigation.state.params.stats[1]} tick={{ stroke: 'white'}}>
                            <Label value={props.navigation.state.params.stats[1]} offset={0} position="insideLeft" />
                        </YAxis>
                        <Tooltip cursor={{ strokeDasharray: '5 5' }} />
                        <Scatter data={scatterData} fill="blue" />
                        </ScatterChart>
                    </ResponsiveContainer>
            </View>
            </ImageBackground>
            <Footer />
        </View>
    )

}

const styles = StyleSheet.create({
    root: {
        width: windowWidth,
        height: windowHeight * 0.8,
        flexDirection: 'column',
        backgroundColor: '#001324'
    },
    header: {
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight / 10,
        backgroundColor: '#001324',
        textAlign: 'center',
        flexDirection: 'row'
    },
      text: {
        fontSize: windowHeight / 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'VitesseSans-Book'
    }
})