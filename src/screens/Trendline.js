import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Switch } from 'react-native'
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Label } from 'recharts'
import { getNormalizedTrendlineData, renderLines, getTrendlineData } from '../data'
import TrendlineToolTip from '../components/TrendlineToolTip'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Trendline(props) {

    const [normalizedData, setNormalizedData] = useState(null)
    const [toolTipPayload, setToolTipPayload] = useState(null)
    const [lines, setLines] = useState([])
    const [isNormalized, setIsNormalized] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (props.stats.length != 0) {
            getTrendlineData({ 'stats': props.stats, 'player': props.player}).then((data) => {
                setData(data[1].data)
                setNormalizedData(data[1].data_n)
                setToolTipPayload(data[1].sums)
                renderLines(props.stats, setLines)
            })
        }
    }, [props.stats, props.player])

    if (props.stats.length == 0) {
        return null
    } else {
        if (normalizedData == null) {
            return null
        } else if (isNormalized) {
            let years = []
            for (var obj of normalizedData) {
                years.push(obj.Year)
            }
            years = years.reverse()
            return (
                <View>
                    <View style={styles.switchView}>
                        <Text style={styles.text}>Normaliserad: </Text>
                        <Switch
                        activeThumbColor="white"
                        activeTrackColor="#078efb"
                        style={{ width: windowWidth*0.03, height: windowHeight*0.03}}
                        onValueChange={setIsNormalized}
                        value={isNormalized} />
                    </View>
                    <LineChart width={windowWidth*0.45} height={windowHeight*0.6} data={normalizedData} >

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                        dataKey="Year" 
                        ticks={years} 
                        interval={0} 
                        reversed={true} 
                        angle={-45} 
                        dx={-windowWidth/100} 
                        tickMargin={windowHeight/80}
                        tick={{ stroke: 'white' }}
                        allowDuplicatedCategory={false} />
                        <YAxis 
                        tick={{ fontSize: 0 }}
                        domain={[0, 1]}>
                            {/* <Label value={`Per match`} angle={-90} stroke='white' position={'insideLeft'} style={{ textAnchor: 'middle'}} /> */}
                        </YAxis>
                        <Tooltip 
                        cursor={{ strokeDasharray: '5 5' }}
                        content={<TrendlineToolTip pl={toolTipPayload} />}
                        isAnimationActive={false}
                        />
                        {lines}
                        <Legend verticalAlign='top' dx={50} />
                    </LineChart>
                </View>
            )
        } else {
            if (data == null) {
                return null
            } else {
                let years = []
                for (var obj of data) {
                    years.push(obj.Year)
                }
                years = years.reverse()
                return (
                    <View>
                        <View style={styles.switchView}>
                            <Text style={styles.text}>Normaliserad: </Text>
                            <Switch
                            activeThumbColor="white"
                            activeTrackColor="#078efb"
                            style={{ width: windowWidth*0.03, height: windowHeight*0.03}}
                            onValueChange={setIsNormalized}
                            value={isNormalized} />
                        </View>
                        <LineChart width={windowWidth*0.45} height={windowHeight*0.6} data={data} >

                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                            dataKey="Year" 
                            ticks={years} 
                            interval={0} 
                            reversed={true} 
                            angle={-45} 
                            dx={-windowWidth/100} 
                            tickMargin={windowHeight/80}
                            tick={{ stroke: 'white' }}
                            allowDuplicatedCategory={false} />
                            <YAxis 
                            tick={{ stroke: 'white' }}>
                                <Label value={`Per match`} angle={-90} stroke='white' position={'insideLeft'} style={{ textAnchor: 'middle'}} />
                            </YAxis>
                            <Tooltip 
                            cursor={{ strokeDasharray: '5 5' }}
                            content={<TrendlineToolTip pl={toolTipPayload} />}
                            isAnimationActive={false}
                            />
                            {lines}
                            <Legend verticalAlign='top' dx={50} />
                         </LineChart>
                        
                    </View>
                )
            }
        }
    }
}

const styles = StyleSheet.create({
    switchView: {
        width: windowWidth*0.45,
        height: windowHeight*0.1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: windowHeight / 50,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'VitesseSans-Book'
    }
})