import Header from '../components/Header'
import Footer from '../components/Footer'
import { View, StyleSheet, ImageBackground, Dimensions, Text } from 'react-native'
import { RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend, PolarRadiusAxis } from 'recharts'
import { useEffect, useState } from 'react'
import { renderRadars, testSpiderFetch, fixSpiderData2, getSpecificStatsMultiID, renderAverageRadar } from '../data'
import _ from 'lodash'
import SpiderSettings from './SpiderSettings'
import Background from '../components/Background'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Spider (props) {
  // States
  const [radars, setRadars] = useState(null)
  const [avgRadar, setAvgRadar] = useState(null)
  const [playerRadars, setPlayerRadars] = useState(null)
  const [statsAndIDs, setIDsAndStats] = useState({})
  const [testSpiderData, setTestSpiderData] = useState(null)
  const [spiderData, setSpiderData] = useState(null)
  const [settingsPressed, setSettingsPressed] = useState(false)
  const [avgOn, setAvgOn] = useState(true)
  const [removedRadars, setRemovedRadars] = useState([])

  function removeFromPlayerRadars (id, playerRadars) {
    const result = []
    for (let i = 0; i < playerRadars.length; i++) {
      if (playerRadars[i].props.dataKey != id) {
        if (playerRadars[i].props.name != 'Position Average') {
          result.push(playerRadars[i])
        }
      } else {
        setRemovedRadars([...removedRadars, playerRadars[i]])
      }
    }
    setPlayerRadars(result)
  }

  function addToPlayerRadars (player, playerRadars) {
    const playerToAdd = removedRadars.filter((radar) => radar.props.dataKey == player.index)[0]
    setPlayerRadars([...playerRadars, playerToAdd])
    setRemovedRadars(removedRadars.filter((radar) => radar.props.dataKey != player.index))
  }

  console.log(removedRadars)

  useEffect(() => {
    if (avgOn) {
      if (playerRadars != null) {
        if (avgRadar != null) {
          if (playerRadars.some((radar) => radar.props.name == 'Position Average')) {
            setRadars(playerRadars)
          } else {
            const allRadars = playerRadars.concat(avgRadar)
            setRadars(allRadars)
          }
        }
      }
    } else {
      setRadars(playerRadars.filter((radar) => radar.props.name != 'Position Average'))
    }
  }, [avgOn, playerRadars, avgRadar])

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
          testSpiderFetch(statsAndIDs.ids, statsAndIDs.stats, props.navigation.state.params.pos).then((data) => {
            let result = fixSpiderData2(data[1], props.navigation.state.params.pos);
            console.log(result)
            setTestSpiderData(result)
          })
        }
      }
    }
  }, [statsAndIDs])

  useEffect(() => {
    if (testSpiderData !== null) {
      
      //retrieve the keys for the fetch (aka index of all players and index of the average-player-index)
      // example keys: ['3600', '3877', '3879', '6321', 'KPI']
      // means we have players with index:
      //  '3600', '3877', '3879'
      // and index of player average:
      //  '6321'
      const keys = Object.keys(testSpiderData.Def[0])

      //set the spider for the individual players
      let players = props.navigation.state.params.players
      setPlayerRadars(renderRadars(players))

      //set the spider for the "average player"
      let average_player = keys[keys.length - 2]
      setAvgRadar(renderAverageRadar(average_player))
    }
  }, [testSpiderData])

  useEffect(() => {
    const ids = []
    for (const player of props.navigation.state.params.players) {
      ids.push('' + player.index)
    }
    setIDsAndStats({ stats: props.navigation.state.params.stats, ids })
  }, [])

  if (testSpiderData === null) {
    return null
  } else {
    if (props.navigation.state.params.manual !== null) {
      if (props.navigation.state.params.manual) {
        return (
          <View>
            <Header stackIndex={3} nav={props.navigation} header={styles.header} />
            <View style={styles.root}>
              <Background weakerLogo={true}/>
              <ResponsiveContainer width={windowWidth} height={windowHeight * 0.75}>
                <RadarChart data={spiderData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey='KPI' fontFamily='VitesseSans-Book' fontWeight='bold' tick={{ fill: 'white' }} fontSize={windowHeight * 0.017} />
                  {radars}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </View>
            <Footer />
          </View>
        )
      } else {
        return (
          <View>
            <Header stackIndex={3} nav={props.navigation} header={styles.header} settingsPressed={settingsPressed} setSettingsPressed={setSettingsPressed} />
            <View style={styles.root}>
              <Background weakerLogo={true}/>
              <View style={{ flexDirection: 'row' }}>

                <SpiderSettings addToPlayerRadars={addToPlayerRadars} removeFromPlayerRadars={removeFromPlayerRadars} settingsPressed={settingsPressed} avgOn={avgOn} setAvgOn={setAvgOn} players={props.navigation.state.params.players} radars={radars} />

                <View>

                  <View style={[styles.spdrs, { width: settingsPressed ? windowWidth * 0.8 : windowWidth }]}>
                    <View style={{ flexDirection: 'column', marginVertical: '2%' }}>
                      <Text style={styles.text}>Skapa målchans</Text>
                      <ResponsiveContainer width={windowWidth * 0.4} height={windowHeight / 3.2}>
                        <RadarChart cx='50%' cy='50%' outerRadius='80%' data={testSpiderData.Goal}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey='KPI' fontFamily='VitesseSans-Book' fontWeight='bold' tick={{ fill: 'white' }} fontSize={windowHeight * 0.017} />
                          <PolarRadiusAxis domain={[0, 1]} angle={30} tick={false} axisLine={false} />
                          {radars}
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </View>
                    <View style={{ flexDirection: 'column', marginVertical: '2%' }}>
                      <Text style={styles.text}>Speluppbyggnad</Text>
                      <ResponsiveContainer width={windowWidth * 0.4} height={windowHeight / 3.2}>
                        <RadarChart cx='50%' cy='50%' outerRadius='80%' data={testSpiderData.Play}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey='KPI' fontFamily='VitesseSans-Book' fontWeight='bold' tick={{ fill: 'white' }} fontSize={windowHeight * 0.017} />
                          <PolarRadiusAxis domain={[0, 1]} angle={30} tick={false} axisLine={false} />
                          {radars}
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </View>

                  </View>

                  <View style={[styles.spdrs, { width: settingsPressed ? windowWidth * 0.8 : windowWidth }]}>
                    <View style={{ flexDirection: 'column', marginVertical: '2%' }}>
                      <Text style={styles.text}>Försvarsspel</Text>
                      <ResponsiveContainer width={windowWidth * 0.4} height={windowHeight / 3.2}>
                        <RadarChart cx='50%' cy='50%' outerRadius='80%' data={testSpiderData.Def}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey='KPI' fontFamily='VitesseSans-Book' fontWeight='bold' tick={{ fill: 'white' }} fontSize={windowHeight * 0.017} />
                          <PolarRadiusAxis domain={[0, 1]} angle={30} tick={false} axisLine={false} />
                          {radars}
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </View>
                    <View style={{ flexDirection: 'column', marginVertical: '2%' }}>
                      <Text style={styles.text}>Sammanställning</Text>
                      <ResponsiveContainer width={windowWidth * 0.4} height={windowHeight / 3.2}>
                        <RadarChart cx='50%' cy='50%' outerRadius='80%' data={testSpiderData.Overall}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey='KPI' fontFamily='VitesseSans-Book' fontWeight='bold' tick={{ fill: 'white' }} fontSize={windowHeight * 0.017} />
                          <PolarRadiusAxis domain={[0, 1]} angle={30} tick={false} axisLine={false} />
                          {radars}
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </View>

                  </View>
                </View>

              </View>
            </View>
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