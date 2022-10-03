import Header from '../components/Header'
import Footer from '../components/Footer'
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { getSpecificStatsMultiID, statsForPositions, renderScatters } from '../data'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts'
import XYToolTip from '../components/XYToolTip'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function XYPlot (props) {
  const [scatterData, setScatterData] = useState([])
  const [scatters, setScatters] = useState(null)

  useEffect(() => {
    statsForPositions(props.navigation.state.params.pos, props.navigation.state.params.stats.concat(['Player'])).then((data) => {
      if (data[0] === 200) {
        data = data[1]
        const result = []
        for (const id of Object.keys(data[props.navigation.state.params.stats[0]])) {
          const obj = {}
          for (const key of props.navigation.state.params.stats) {
            obj[key] = data[key][id]
          }
          obj['Player'] = data.Player[id]
          result.push(obj)
        }
        setScatterData(result)
      }
    })
    getSpecificStatsMultiID(props.navigation.state.params.ids, props.navigation.state.params.stats.concat(['Player'])).then((data) => {
      if (data[0] === 200) {
        data = data[1]
        const players = []
        for (const id of props.navigation.state.params.ids) {
          const obj = {}
          obj.Player = data.Player[id]
          const playerData = []
          const obj2 = {}
          for (const key of props.navigation.state.params.stats) {
            obj2[key] = data[key][id]
          }
          obj2['Player'] = data.Player[id]
          playerData.push(obj2)
          obj.data = playerData
          players.push(obj)
        }
        setScatters(renderScatters(players))
      }
    })
  }, [])

  if (scatters === null) {
    return null
  } else {
    return (
      <View>
        <Header stackIndex={1} nav={props.navigation} header={styles.header} />
        <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode='cover'>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '1%' }}>
            <ResponsiveContainer width={windowWidth * 0.75} height={windowHeight * 0.75} >
              <ScatterChart
              >
                <CartesianGrid />
                <XAxis type='number' dataKey={props.navigation.state.params.stats[0]} tick={{ stroke: 'white' }}>
                  <Label value={props.navigation.state.params.stats[0]} offset={0} position='insideBottom' stroke='white'/>
                </XAxis>
                <YAxis type='number' dataKey={props.navigation.state.params.stats[1]} tick={{ stroke: 'white' }} >
                  <Label value={props.navigation.state.params.stats[1]} offset={20} position='insideLeft' stroke='white' angle={270} />
                </YAxis>
                <ZAxis dataKey='Player' />
                <Tooltip cursor={{ strokeDasharray: '5 5' }} content={ <XYToolTip /> } isAnimationActive={false} />
                <Scatter name='Alla' data={scatterData} fill='gray' isAnimationActive={false} />
                {scatters}
                <Legend verticalAlign='top'/>
              </ScatterChart>
            </ResponsiveContainer>
          </View>
        </ImageBackground>
        <Footer />
      </View>
    )
  }
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
