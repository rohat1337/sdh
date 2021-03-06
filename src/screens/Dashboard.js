import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import DefensiveActions from '../components/Dashboard/DefensiveActions'
import FastaSituationer from '../components/Dashboard/FastaSitatuationer'
import InfoSquare from '../components/Dashboard/Infosquare'
import OffensiveActions from '../components/Dashboard/OffensiveActions'
import Speluppbyggnad from '../components/Dashboard/Speluppbyggnad'
import Header from '../components/Header'
import { getPlayerStats, getMaxStatsAll, uncheckFieldBox, getMaxStatsForPositionArray } from '../data'
import DashboardPlayerfield from '../components/Dashboard/DashbordPlayerfield'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function Dashboard (props) {
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [maxStats, setMaxStats] = useState(null)
  const [field, setField] = useState([])
  const player_id = props.navigation.getParam('player_id', 'default')

  useEffect(() => {
    getPlayerStats(props.navigation.getParam('player_id', 'default'))
      .then((response) => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
      })
      .then((data) => {
        data = data[1]
        console.log(data)
        setSelectedPlayer(data)
      })

    // fetch all stats
    getMaxStatsAll(allStats)
      .then((response) => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
      })
      .then((data) => {
        data = data[1]
        setMaxStats(data)
      })
  }, [])

  useEffect(() => {
    if (field.length > 0) {
      console.log('fetching for positions: ', field)
      getMaxStatsForPositionArray(allStats, field)
        .then((response) => {
          const statusCode = response.status
          const data = response.json()
          return Promise.all([statusCode, data])
        })
        .then((data) => {
          data = data[1]
          setMaxStats(data)
        })
    } else {
      // fetch all stats
      getMaxStatsAll(allStats)
        .then((response) => {
          const statusCode = response.status
          const data = response.json()
          return Promise.all([statusCode, data])
        })
        .then((data) => {
          data = data[1]
          setMaxStats(data)
        })
    }
  }, [field])

  // for playerfield dashboard
  function changeField (positions) {
    if (positions.includes('0')) {
      setField(uncheckFieldBox(field, positions))
      console.log('field: ', field)
    } else {
      setField([...field, ...positions.split(', ')])
      console.log('field: ', field)
      console.log('width: ', windowWidth)
      console.log('height: ', windowHeight)
    }
  }

  // Tagna fr??n Adrians excelark
  const offensiveActions = ['Non-penalty goals per 90', 'xG per 90', 'Shots per 90', 'Shots on target, %', 'Assists per 90', 'Crosses from left flank per 90', 'Accurate crosses from left flank, %', 'Crosses from right flank per 90', 'Accurate crosses from right flank, %', 'Dribbles per 90', 'Successful dribbles, %', 'Offensive duels per 90', 'Offensive duels won, %', 'Touches in box per 90', 'Progressive runs per 90', 'Accelerations per 90']
  const speluppbyggnad = ['Received passes per 90', 'Passes per 90', 'Accurate passes, %', 'Forward passes per 90', 'Accurate forward passes, %', 'Average pass length, m', 'xA per 90', 'Shot assists per 90', 'Passes to final third per 90', 'Accurate passes to final third, %', 'Passes to penalty area per 90', 'Accurate passes to penalty area, %', 'Deep completions per 90', 'Progressive passes per 90', 'Accurate progressive passes, %']
  const defensiveActions = ['Successful defensive actions per 90', 'Defensive duels per 90', 'Defensive duels won, %', 'Aerial duels per 90', 'Aerial duels won, %', 'Sliding tackles per 90', 'PAdj Sliding tackles', 'Shots blocked per 90', 'PAdj Interceptions']
  const fastaSituationer = ['Free kicks per 90', 'Direct free kicks per 90', 'Direct free kicks on target, %', 'Corners per 90', 'Penalties taken', 'Penalty conversion, %']
  const allStats = offensiveActions.concat(defensiveActions, fastaSituationer, speluppbyggnad)

  return (
    <View style={{ flexDirection: 'column', height: windowHeight - windowHeight / 10, width: windowWidth }}>

      <Header header={styles.header} stackIndex={2} nav={props.navigation} player_id={player_id} />

      {/* Till senare: Hur ska man switcha mellan om man valt flera spelare innan man g??r till dashboarden */}

      {/* Put content here (This view is divided into 4 parts, row) */}
      <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode='cover'>

        {/* Leftmost view, inforutan + 10 viktigaste m??tpunkterna */}
        <View style={{ flex: 0.25, height: '100%' }}>

          {/* Inforutan */}
          <View style={{ flex: 0.45, flexDirection: 'column' }}>
            <InfoSquare player={selectedPlayer} />
          </View>

          <View style={{ flex: 0.55 }}>
            <DashboardPlayerfield func={changeField} />

          </View>

        </View>

        {/* Offensiva aktioner */}
        <View style={{ flex: 0.25 }}>
          <Text style={styles.dashboard_stat_header}>Offensiva aktioner</Text>
          <OffensiveActions player={selectedPlayer} stats={offensiveActions} maxStats={maxStats} />
        </View>

        {/* Speluppbyggnad */}
        <View style={{ flex: 0.25 }}>
          <Text style={styles.dashboard_stat_header}>Speluppbyggnad</Text>
          <Speluppbyggnad player={selectedPlayer} stats={speluppbyggnad} maxStats={maxStats} />
        </View>

        <View style={{ flex: 0.25 }}>
          {/* Defensiva aktioner */}
          <View style={{ flex: 0.58 }}>
            <Text style={styles.dashboard_stat_header}>Defensiva aktioner</Text>
            <DefensiveActions player={selectedPlayer} stats={defensiveActions} maxStats={maxStats} />
          </View>

          {/* Fasta situationer */}
          <View style={{ flex: 0.42 }}>
            <Text style={styles.dashboard_stat_header}>Fasta situationer</Text>
            <FastaSituationer player={selectedPlayer} stats={fastaSituationer} maxStats={maxStats} />
          </View>

        </View>
      </ImageBackground>
    </View>

  )
}

const styles = StyleSheet.create({
  header: {
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight / 10,
    backgroundColor: '#001324',
    textAlign: 'center',
    flexDirection: 'row'
  },
  root: {
    width: windowWidth,
    height: windowHeight - windowHeight / 10,
    flexDirection: 'row',
    backgroundColor: '#001324'
  },
  dashboard_stat_header: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'VitesseSans-Book'
  },
  filter_text: {
    fontsize: 14,
    textAlign: 'left',
    color: 'white',
    fontFamily: 'VitesseSans-Book'
  }
})

export default Dashboard
