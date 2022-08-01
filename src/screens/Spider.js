import Header from '../components/Header'
import Footer from '../components/Footer'
import { View, StyleSheet, ImageBackground, Dimensions, Text } from 'react-native'
import { RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts'
import { useEffect, useState } from 'react'
import { renderRadars, testSpiderFetch, fixSpiderData2, getSpecificStatsMultiID } from '../data'
import _ from 'lodash'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Spider (props) {
  // States
  const [radars, setRadars] = useState(null)
  const [statsAndIDs, setIDsAndStats] = useState({})
  const [refreshDev, setRefreshDev] = useState(false)
  const [testSpiderData, setTestSpiderData] = useState(null)
  const [spiderData, setSpiderData] = useState(null)

  useEffect(() => {
    if (refreshDev) {
      if (!_.isEqual({}, statsAndIDs)) {
        testSpiderFetch(statsAndIDs.ids, statsAndIDs.stats).then((data) => {
          console.log(data)
        })
      }
    } setRefreshDev(false)
  }, [refreshDev])

  useEffect(() => {
    if (!_.isEqual({}, statsAndIDs)) {
      const manual = props.navigation.state.params.manual
      if (manual !== null) {
        if (manual) {
          setTestSpiderData('manual')
          setSpiderData(getSpecificStatsMultiID(statsAndIDs.ids, props.navigation.state.params.stats).then((data) => {
            if (data[0] === 200) {
              data = data[1]
              const spider = []
              for (const key of props.navigation.state.params.stats) {
                const obj = {}
                obj.KPI = key
                spider.push(obj)
              }
              for (const ob of spider) {
                for (const id of Object.keys(data[ob.KPI])) {
                  ob[id] = data[ob.KPI][id]
                }
              }
              setSpiderData(spider)
            }
          }))
        } else {
          testSpiderFetch(statsAndIDs.ids, statsAndIDs.stats).then((data) => {
            console.log('spiderdata from fetch: ', data[1])
            setTestSpiderData(fixSpiderData2(data[1], props.navigation.state.params.pos))
          })
        }
      }
    }
    console.log(statsAndIDs)
  }, [statsAndIDs])

  useEffect(() => {
    setRadars(renderRadars(props.navigation.state.params.players))
    const ids = []
    for (const player of props.navigation.state.params.players) {
      ids.push('' + player.index)
    }
    console.log(props.navigation.state.params.stats)
    setIDsAndStats({ stats: props.navigation.state.params.stats, ids })
  }, [])

  console.log('testspiderdata: ', testSpiderData)

  if (testSpiderData === null) {
    return null
  } else {
    if (props.navigation.state.params.manual !== null) {
      if (props.navigation.state.params.manual) {
        return (
          <View>
            <Header stackIndex={1} nav={props.navigation} header={styles.header} />
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode='cover'>
              <ResponsiveContainer width={windowWidth} height={windowHeight * 0.85}>
                <RadarChart cx='50%' cy='50%' outerRadius='80%' data={spiderData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey='KPI' fontFamily='VitesseSans-Book' fontWeight='bold' tick={{ fill: 'white' }} fontSize={windowHeight * 0.017} />
                  {radars}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </ImageBackground>
            <Footer />
          </View>
        )
      } else {
        console.log(radars)
        return (

          <View>
            <Header stackIndex={1} nav={props.navigation} header={styles.header} />
            <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode='cover'>
              <View>
                <View style={styles.spdrs}>
                  <View style={{ flexDirection: 'column', marginVertical: '2%' }}>
                    <Text style={styles.text}>Skapa målchans</Text>
                    <ResponsiveContainer width={windowWidth / 2} height={windowHeight / 3}>
                      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={testSpiderData.Goal}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey='KPI' fontFamily='VitesseSans-Book' fontWeight='bold' tick={{ fill: 'white' }} fontSize={windowHeight * 0.017} />
                        {radars}
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </View>
                  <View style={{ flexDirection: 'column', marginVertical: '2%' }}>
                    <Text style={styles.text}>Speluppbyggnad</Text>
                    <ResponsiveContainer width={windowWidth / 2} height={windowHeight / 3}>
                      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={testSpiderData.Play}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey='KPI' fontFamily='VitesseSans-Book' fontWeight='bold' tick={{ fill: 'white' }} fontSize={windowHeight * 0.017} />
                        {radars}
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </View>

                </View>

                <View style={styles.spdrs}>
                  <View style={{ flexDirection: 'column', marginVertical: '2%' }}>
                    <Text style={styles.text}>Försvarsspel</Text>
                    <ResponsiveContainer width={windowWidth / 2} height={windowHeight / 3}>
                      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={testSpiderData.Def}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey='KPI' fontFamily='VitesseSans-Book' fontWeight='bold' tick={{ fill: 'white' }} fontSize={windowHeight * 0.017} />
                        {radars}
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </View>
                  <View style={{ flexDirection: 'column', marginVertical: '2%' }}>
                    <Text style={styles.text}>Sammanställning</Text>
                    <ResponsiveContainer width={windowWidth / 2} height={windowHeight / 3}>
                      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={testSpiderData.Overall}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey='KPI' fontFamily='VitesseSans-Book' fontWeight='bold' tick={{ fill: 'white' }} fontSize={windowHeight * 0.017} />
                        {radars}
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </View>

                </View>

              </View>
            </ImageBackground>
            <Footer />
          </View>
        )
      }
    }
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
  spdrs: {
    flexDirection: 'row',
    width: windowWidth,
    height: (windowHeight * 0.8) / 2,
    justifyContent: 'space-evenly'
  },
  text: {
    fontSize: windowHeight / 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'VitesseSans-Book'
  }
})
