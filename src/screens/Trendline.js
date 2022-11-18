import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, } from 'react-native'
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Label } from 'recharts'
import { getTrendlineData } from '../data'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Trendline(props) {

    const [data, setData] = useState(null)

    useEffect(() => {
        if (props.stat != null) {
            getTrendlineData(props).then((data) => {
                setData(data[1].data)
            })
        }
    }, [props.stat])
    if (props.stat == null) {
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
                    tick={{ stroke: 'white' }} />
                    <YAxis 
                    tick={{ stroke:'white'}}>
                        <Label value={`${props.stat} / match`} angle={-90} stroke='white' position={'insideLeft'} style={{ textAnchor: 'middle'}} />
                    </YAxis>
                    <Line type="monotone" dataKey={props.player.toString()} stroke="#8884d8" strokeWidth={3} />

                </LineChart>
            )
        }
    }
}