import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground } from 'react-native'
import { getBasicStats, zip, arrayRemove, fix, updateField, checkFoot, fixPlayerPositions, contractToString, getPlayerCountAll, getPlayerCount } from '../data'
import Slider from '@react-native-community/slider'
import PlayerField from '../components/PlayerField'
import Header from '../components/Header'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

let age
let heightcm
let contractLengths
let minutes

function ChoosePlayer (props) {
  function changeField (positions) {
    updateField(positions, setField)
  }

  function clearField () {
    setField([])
  }

  const [field, setField] = useState([])
  const [players, setPlayers] = useState([])
  const [selectedPlayersWithID, setSelectedPlayersWithID] = useState([])
  const [player, setPlayer] = useState(null)
  const [searchTeam, setTeam] = useState('')
  const [searchPosition, setPosition] = useState('')
  const [searchPlayer, setSearchPlayer] = useState('')
  const [selectedPlayersLength, setSelectedPlayersLength] = useState(0)
  const [totalPlayersLength, setTotalPlayersLength] = useState(0)
  // States for minutes played slider
  const [minutesPlayed, setMinutesPlayed] = useState(0)
  // Ålder states
  const [minAge, setMinAge] = useState(0)
  const [maxAge, setMaxAge] = useState(0)
  // Höjd states
  const [minHeight, setMinHeight] = useState(0)
  // Fot
  const [leftFoot, setLeftFoot] = useState(false)
  const [rightFoot, setRightFoot] = useState(false)
  // Kontraktlängd
  const [minContract, setMinContract] = useState(0)
  const [maxContract, setMaxContract] = useState(50)

  useEffect(() => {
    getBasicStats() // Fetch
      .then((response) => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
      })
      .then((data) => {
        data = data[1]
        const result = []
        const keys = Object.keys(data)
        keys.unshift('ID')

        // Get lists of all names, team names etc..
        const ids = Object.keys(data.Player)
        const players = Object.values(data.Player)
        const teams = Object.values(data['Team within selected timeframe'])
        const position = Object.values(data.Position)
        const foot = Object.values(data.Foot)

        age = Object.values(data.Age)
        minutes = Object.values(data['Minutes played'])
        heightcm = arrayRemove(Object.values(data.Height), 0)
        contractLengths = (Object.values(data['Contract expires'])).map(dates => ((new Date(dates).getTime() - new Date())))

        const list = zip(ids, players, teams, position, age, contractLengths, minutes, foot, heightcm, ids)
        // For every player, create object
        // This is only needed because of format issues from flask (no object propety names to access)
        for (const player of list) {
          const playerObj = {}
          let infoIndex = 0
          for (const info of keys) {
            playerObj[info] = player[infoIndex]
            infoIndex++
          }
          result.push(playerObj)
        }
        setPlayers(result)
        setSearchPlayer('')
      })
    getPlayerCountAll()
      .then((response) => {
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([statusCode, data]);
      })
      .then((data) => {
          data = data[1]
          setTotalPlayersLength(data)
          setSelectedPlayersLength(data)
      })
  }, [])

  // Check if selected player is already chosen or not.
  useEffect(() => {
    if (player != null) {
      if (selectedPlayersWithID.includes(player)) {
        setSelectedPlayersWithID(arrayRemove(selectedPlayersWithID, player))
      } else {
        setSelectedPlayersWithID([...selectedPlayersWithID, player])
      }
    }
    setPlayer(null)
  }, [player])

  useEffect(() => {
      if (field.length > 0) {
          getPlayerCount(field)
          .then((response) => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
          })
          .then((data) => {
              data = data[1]
              setSelectedPlayersLength(data)
          })
      } else {
          getPlayerCountAll()
          .then((response) => {
              const statusCode = response.status;
              const data = response.json();
              return Promise.all([statusCode, data]);
          })
          .then((data) => {
              data = data[1]
              setSelectedPlayersLength(data)
          })
      }
  }, [field])

  return (
    <View style={{ flexDirection: 'column' }}>
      <Header header={styles.header} nav={props.navigation} stackIndex={0} players={selectedPlayersWithID} player_id={selectedPlayersWithID[0]} nextIsOK={selectedPlayersWithID.length > 0 ? 'white' : 'gray'} />

      <ImageBackground style={styles.root} source={require('../imgs/iks.png')} resizeMode='cover'>

        <View style={styles.root_left}>
          <TextInput
            placeholder='Sök spelare...'
            placeholderTextColor='white'
            style={styles.search}
            onChangeText={setSearchPlayer}
            value={searchPlayer}
          />
          <Text style={styles.text_filters}> Visar {selectedPlayersLength} av {totalPlayersLength}</Text>
          <View style={{ height: '85%' }}>
            <FlatList
                            // Filter players by Name, Team, Age, Position and Minutes played
              data={players.filter((player) => 
                                (fix(player.Player.toLowerCase()).includes(searchPlayer.toLowerCase()) &&
                                player['Team within selected timeframe'].toLowerCase().includes(searchTeam.toLowerCase()) &&
                                (player.Age >= minAge && player.Age <= maxAge) &&
                                fixPlayerPositions(player.Position.toLowerCase()).includes(searchPosition.toLowerCase()) &&
                                player['Minutes played'] >= minutesPlayed &&
                                player.Height >= minHeight &&
                                checkFoot(player, leftFoot, rightFoot)) &&
                                (field.some(ele => player.Position.toLowerCase().includes(ele)) || field.length === 0))}
              renderItem={({ item }) => {
                const textColor = selectedPlayersWithID.includes(item) ? '#ffe00f' : 'white'
                return (
                  <View style={styles.players_TO}>
                    <TouchableOpacity
                      onPress={() => { setPlayer(item) }}
                      style={{ justifyContent: 'center' }}>

                      <View style={styles.players_V}>
                        <View style={styles.players_V_L}>
                          <Text style={[styles.text_L, { color: textColor }]}>{item.Player}</Text>
                        </View>
                        <View style={styles.players_V_R}>
                          <Text style={[styles.text_R, { color: textColor }]}>{item['Team within selected timeframe']}</Text>
                          <Text style={[styles.text_R, { color: textColor }]}>, </Text>
                          <Text style={[styles.text_R, { color: textColor }]}>{item.Age} år</Text>
                          <Text style={[styles.text_R, { color: textColor }]}>, </Text>
                          <Text style={[styles.text_R, { color: textColor }]}>{fixPlayerPositions(item.Position)}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </View>
        </View>
        <View style={styles.root_right}>
          <View style={styles.filters_U}>
            <View style={[styles.filters_UL, { marginTop: '4%' }]}>
              <TextInput
                placeholder='Sök lag...'
                placeholderTextColor='white'
                style={styles.search_small}
                onChangeText={setTeam}
              />
              <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', marginLeft: '1%', marginBottom: '3%' }}>
                <View>
                  <View style={{ flexDirection: 'row', width: windowWidth / 10 }}>
                    <Text style={styles.slider_text}>Ålder (min)</Text>
                    <TextInput
                      style={[styles.slider_text, { width: windowWidth / 30 }]}
                      value={minAge}
                      onChangeText={value => setMinAge(value)}
                    />
                  </View>

                  <Slider
                    style={{ width: windowWidth / 9, height: windowHeight / 20 }}
                    minimumValue={Math.min.apply(Math, age)}
                    maximumValue={Math.max.apply(Math, age)}
                    minimumTrackTintColor='#078efb'
                    maximumTrackTintColor='gray'
                    thumbTintColor='#078efb'
                    value={Math.min.apply(Math, age)}
                    onValueChange={value => setMinAge(parseInt(value))}
                  />
                </View>
                <View style={{ marginLeft: '3%' }}>
                  <View style={{ flexDirection: 'row', width: windowWidth / 10 }}>
                    <Text style={styles.slider_text}>Ålder (max)</Text>
                    <TextInput
                      style={[styles.slider_text, { width: windowWidth / 30 }]}
                      value={maxAge}
                      onChangeText={value => setMaxAge(value)}
                    />
                  </View>

                  <Slider
                    style={{ width: windowWidth / 9, height: windowHeight / 20 }}
                    minimumValue={Math.min.apply(Math, age)}
                    maximumValue={Math.max.apply(Math, age)}
                    minimumTrackTintColor='#078efb'
                    maximumTrackTintColor='gray'
                    thumbTintColor='#078efb'
                    value={Math.max.apply(Math, age)}
                    onValueChange={value => setMaxAge(parseInt(value))}
                  />
                </View>
              </View>
            </View>
            <View style={[styles.filters_UL, { marginTop: '1%' }]}>
              <TextInput
                placeholder='Sök position...'
                placeholderTextColor='white'
                style={styles.search_small}
                onChangeText={setPosition}
              />

              {/* Längd och fot */}
              <View style={{ flex: 0.5, marginLeft: '1%', marginBottom: '2.5%', flexDirection: 'row' }}>

                {/* Längd */}
                <View>

                  <View style={{ flexDirection: 'row', width: windowWidth / 10 }}>
                    <Text style={styles.slider_text}>Min. längd (cm)</Text>
                    <TextInput
                      style={[styles.slider_text, { width: windowWidth / 30 }]}
                      value={minHeight}
                      onChangeText={value => setMinHeight(value)}
                    />
                  </View>

                  <Slider
                    style={{ width: windowWidth / 9, height: windowHeight / 20 }}
                    minimumValue={Math.min.apply(Math, heightcm)}
                    maximumValue={Math.max.apply(Math, heightcm)}
                    minimumTrackTintColor='#078efb'
                    maximumTrackTintColor='gray'
                    thumbTintColor='#078efb'
                    value={Math.min.apply(Math, heightcm)}
                    onValueChange={value => setMinHeight(parseInt(value))}
                  />
                </View>

                {/* Fot */}
                <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: '3%' }}>
                  <Text style={styles.slider_text}>Fot: </Text>
                  <TouchableOpacity
                    style={{ marginLeft: '10%' }}
                    onPress={() => { setLeftFoot(!leftFoot) }}>
                    <Text style={[styles.slider_text, { color: (leftFoot ? '#ffe00f' : 'white') }]}>
                      Vänster
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: '10%' }}
                    onPress={() => { setRightFoot(!rightFoot) }}>
                    <Text style={[styles.slider_text, { color: (rightFoot ? '#ffe00f' : 'white') }]}>Höger

                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[styles.filters_UL, { marginTop: '2%' }]}>
              <View style={{ flex: 0.5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.slider_text, { marginLeft: '15%' }]}>Spelade minuter</Text>
                  <TextInput
                    placeholder={0}
                    value={minutesPlayed}
                    style={styles.slider_text}
                    onChangeText={value => setMinutesPlayed(value)}/>
                </View>
                <Slider
                  style={{ width: windowWidth / 4.5, height: windowHeight / 20, marginLeft: '0%', marginBottom: '6%' }}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor='#078efb'
                  maximumTrackTintColor='gray'
                  thumbTintColor='#078efb'
                  value={0}
                  onValueChange={value => setMinutesPlayed(parseInt(value * 2700))}
                />
              </View>

              <View style={{ flex: 0.5 }}>

                <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', marginLeft: '1%', marginBottom: '3%' }}>
                  <View>
                    <View style={{ flexDirection: 'row', width: windowWidth / 10 }}>
                      <Text style={styles.slider_text}>Kontraktlängd (min)</Text>
                      <TextInput
                        style={[styles.slider_text, { width: windowWidth / 30 }]}
                        value={contractToString(minContract)}
                        onChangeText={value => setMinContract(value)}
                      />
                    </View>

                    <Slider
                      style={{ width: windowWidth / 9, height: windowHeight / 20 }}
                      minimumValue={Math.min.apply(Math, contractLengths)}
                      maximumValue={Math.max.apply(Math, contractLengths)}
                      minimumTrackTintColor='#078efb'
                      maximumTrackTintColor='gray'
                      thumbTintColor='#078efb'
                      value={0}
                      onValueChange={value => setMinContract(parseInt(value))}
                    />
                  </View>
                  <View style={{ marginLeft: '3%' }}>
                    <View style={{ flexDirection: 'row', width: windowWidth / 10 }}>
                      <Text style={styles.slider_text}>Kontraktlängd (max)</Text>
                      <TextInput
                        style={[styles.slider_text, { width: windowWidth / 30 }]}
                        placeholder={maxContract}
                        value={Math.min((Math.max.apply(Math, contractLengths)), maxContract)}
                        onChangeText={value => setMaxContract(value)}
                      />
                    </View>

                    <Slider
                      style={{ width: windowWidth / 10, height: windowHeight / 20 }}
                      minimumValue={Math.min.apply(Math, contractLengths)}
                      maximumValue={Math.max.apply(Math, contractLengths)}
                      minimumTrackTintColor='#078efb'
                      maximumTrackTintColor='gray'
                      thumbTintColor='#078efb'
                                            // value={50}
                      onValueChange={value => setMaxContract(parseInt(value))}
                    />
                  </View>
                </View>
              </View>

            </View>

          </View>
          <View style={styles.filters_L}>
            <PlayerField func={changeField} mall={false} field={field} clearField={clearField} />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: windowWidth,
    height: windowHeight - windowHeight / 10,
    flexDirection: 'row',
    backgroundColor: '#001324'
  },
  root_left: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  root_right: {
    flex: 0.55,
    height: windowHeight - windowHeight / 10
  },
  players_TO: {
    width: windowWidth / 3,
    height: windowHeight / 20,
    borderRadius: 100,
    backgroundColor: '#0059a1',
    marginVertical: "1%"
  },
  players_V: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  players_V_L: {
    flexDirection: 'row',
    width: windowWidth / 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.45
  },
  players_V_R: {
    width: windowWidth / 4,
    height: windowHeight / 14,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: windowWidth / 60,
    flex: 0.55
  },
  text_L: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 100,
    fontFamily: 'VitesseSans-Book',
    marginBottom: '7%'
  },
  text_R: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth / 100,
    fontFamily: 'VitesseSans-Book',
    marginBottom: '3.5%'
  },
  filters_U: {
    height: '40%',
    alignItems: 'center'
  },
  filters_L: {
    height: '60%',
    alignItems: 'center',
    marginBottom: '30%'
  },
  search: {
    marginTop: '2%',
    paddingLeft: '2%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    width: '80%',
    height: windowHeight / 14,
    fontSize: windowHeight * 0.02,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    color: 'white',
    fontFamily: 'VitesseSans-Book',
    opacity: 0.9
  },
  filters_UL: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    height: '20%'
  },
  filters_TO: {
    backgroundColor: '#0059a1',
    width: windowWidth / 4.5,
    height: windowHeight / 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  text_filters: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'VitesseSans-Book'
  },
  search_small: {
    flex: 0.5,
    paddingLeft: '2%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    height: '55%',
    fontSize: windowHeight * 0.015,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    color: 'white',
    fontFamily: 'VitesseSans-Book',
    opacity: 0.9
  },
  image: {
    flex: 1
  },
  slider_text: {
    fontSize: windowHeight * 0.018,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    color: 'white',
    fontFamily: 'VitesseSans-Book',
    marginVertical: '1%'
  },
  header: {
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight / 10,
    backgroundColor: '#001324',
    textAlign: 'center',
    flexDirection: 'row'
  }
})

export default ChoosePlayer
