import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, TextInput } from 'react-native'
import { getStatNames, arrayRemove, filterArray, getIDs } from '../data'
import PlayerField from './PlayerField'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function ManualCS (props) {
  // States
  const [stats, setStats] = useState(null)
  const [selectedStats, setSelectedStats] = useState([])
  const [selectStat, setSelectStat] = useState(null)
  const [search, setSearch] = useState('')
  const [filteredStats, setFilteredStats] = useState([])

  function nextOK () {
    return ((selectedStats.length === 2) && (props.xyOK))
  }

  useEffect(() => {
    getStatNames().then((data) => {
      if (data[0] === 200) {
        data = data[1]
        setStats(data)
        setFilteredStats(data)
      }
    })
  }, [])

  useEffect(() => {
    if (selectStat != null) {
      if (selectedStats.includes(selectStat)) {
        setSelectedStats(arrayRemove(selectedStats, selectStat))
      } else {
        setSelectedStats([...selectedStats, selectStat])
      }
    }
    setSelectStat(null)
  }, [selectStat])

  useEffect(() => {
    if (search === '') {
      setFilteredStats(stats)
    } else {
      setFilteredStats(filterArray(stats, search))
    }
  }, [search])

  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <FlatList
          data={filteredStats}
          renderItem={({ item }) => {
            const backgroundColor = selectedStats.includes(item) ? '#0059a1' : '#001a30'
            return (
              <TouchableOpacity
                style={[styles.statButton, { backgroundColor }]}
                onPress={() => setSelectStat(item)}
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>

      <View style={styles.right}>
        <TextInput
          style={styles.search}
          value={search}
          placeholder='Sök KPI:er...'
          onChangeText={setSearch}
        />
        <View style={styles.rightLower}>

          <View style={styles.fieldView}>

            <PlayerField func={props.func} button={props.button} mall clearField={props.clearField} />

          </View>

          <View style={styles.graphs}>
            <TouchableOpacity
              disabled={!(selectedStats.length > 2)}
              style={[styles.graphButton, { backgroundColor: selectedStats.length > 2 ? 'gray' : '#292929' }]}
              onPress={() => props.nav.navigate('Spider', { players: props.players, stats: selectedStats, manual: true })}
            >
              <Text style={styles.text}>Spindel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!nextOK()}
              style={[styles.graphButton, { backgroundColor: nextOK() ? 'gray' : '#292929' }]}
              onPress={() => props.nav.navigate('XYPlot', { ids: getIDs(props.players), stats: selectedStats, pos: props.pos })}
            >
              <Text style={styles.text}>X/Y</Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.75,
    alignSelf: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    height: windowHeight * 0.75,
    width: windowWidth * 0.3,
    alignItems: 'center'
  },
  right: {
    height: windowHeight * 0.75,
    width: windowWidth * 0.5,
    alignItems: 'center'
  },
  text: {
    fontSize: windowHeight / 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'VitesseSans-Book'
  },
  statButton: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: windowWidth / 70
  },
  search: {
    paddingLeft: '2%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    width: '80%',
    marginTop: '3%',
    height: windowHeight / 14,
    fontSize: 17,
    fontWeight: 'bold',
    backgroundColor: 'rgba(80, 80, 80, 1)',
    fontFamily: 'VitesseSans-Book',
    color: 'white'
  },
  rightLower: {
    width: windowWidth * 0.5,
    height: windowHeight / 2,
    marginTop: '5%',
    justifyContent: 'center'
  },
  filterButton: {
    width: windowWidth * 0.13,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    aligntItems: 'center',
    borderRadius: 100,
    marginHorizontal: windowHeight * 0.011
  },
  graphs: {
    height: windowHeight / 5,
    borderRadius: 20,
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  graphButton: {
    height: windowHeight / 8,
    width: windowWidth / 10,
    backgroundColor: 'gray',
    borderRadius: 20,
    justifyContent: 'center'
  },
  fieldView: {
  }
})
