import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, } from 'react-native'
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Label } from 'recharts'
import { getTrendlineData, renderLines } from '../data'
import TrendlineToolTip from '../components/TrendlineToolTip'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Trendline(props) {

    const [data, setData] = useState(null)
    const [toolTipPayload, setToolTipPayload] = useState(null)
    const [lines, setLines] = useState([])

    useEffect(() => {
        if (props.stats.length != 0) {
            getTrendlineData({ 'stats': props.stats, 'player': props.player}).then((data) => {
                setData(data[1].data)
                setToolTipPayload(data[1].sums)
                renderLines(props.stats, setLines)
            })
        }
    }, [props.stats])

    if (props.stats.length == 0) {
        return null
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
                <LineChart width={windowWidth*0.45} height={windowHeight*0.7} data={data} >

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
                    tick={{ stroke:'white'}}
                    domain={[0, 1]}>
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
            )
        }
    }
}