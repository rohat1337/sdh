import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground, ActivityIndicator } from 'react-native'
import { getBasicStats, arrayRemove, fix, updateField, checkFoot, fixPlayerPositions, getPlayerCountAll, getPlayerCount, countPlayersForPosition } from '../data'
// import Slider from '@react-native-community/slider'
import Slider from '@sharcoux/slider'
import PlayerField from '../components/PlayerField'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filters from './Filters'
import './background.css'
import Background from '../components/Background'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

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
  const [maxAge, setMaxAge] = useState(50)
  // Höjd states
  const [minHeight, setMinHeight] = useState(0)
  // Fot
  const [leftFoot, setLeftFoot] = useState(false)
  const [rightFoot, setRightFoot] = useState(false)
  // Visa selectedPlayers
  const [toggleSelectedPlayers, setToggleSelectedPlayers] = useState(false)
  const [filterPressed, setFilterPressed] = useState(false)
  const [playersFiltered, setPlayersFiltered] = useState([])
  const [filters, setFilters] = useState([])
  const [backgroundColor, setBackgroundColor] = useState('#001324')

  useEffect(() => {
    Promise.all([
      getBasicStats(),
      getPlayerCountAll()
    ])
      .then(async ([res1, res2]) => {
        const a = await res1.json()
        const b = await res2.json()
        setPlayers(a.sort((a, b) => b['Market value'] - a['Market value']))
        setSearchPlayer('')
        setTotalPlayersLength(b)
        setSelectedPlayersLength(b)
      })
      .catch((e) => {
        console.log(e)
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
      if (toggleSelectedPlayers) {
        setSelectedPlayersLength(countPlayersForPosition(field, selectedPlayersWithID))
      } else {
        getPlayerCount(field)
          .then((response) => {
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
          })
          .then((data) => {
            data = data[1]
            setSelectedPlayersLength(data)
          })
      }
    } else {
      // catch if selected players are being shown
      if (toggleSelectedPlayers) {
        setSelectedPlayersLength(selectedPlayersWithID.length)
      } else {
        getPlayerCountAll()
          .then((response) => {
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
          })
          .then((data) => {
            data = data[1]
            setSelectedPlayersLength(data)
          })
      }
    }
  }, [field])

  useEffect(() => {
    // selectedPlayersLength depends on whether we are showing selected players or showing all players
    if (toggleSelectedPlayers) {
      setSelectedPlayersLength(selectedPlayersWithID.length)
    } else {
      setSelectedPlayersLength(players.length)
    }
  }, [toggleSelectedPlayers])

  if (players.length === 0) {
    {/* VIEW TO RETURN IF NO PLAYERS ARE LOADED */}
    return (
      <View style={{ flexDirection: 'column' }}>
        <Header
          header={styles.header}
          nav={props.navigation}
          stackIndex={0}
          players={selectedPlayersWithID}
          player_dashboard={selectedPlayersWithID[0]}
          nextIsOK_dashboard={selectedPlayersWithID.length === 1 ? 'white' : '#5d5e5e'}
          nextIsOK_spider={selectedPlayersWithID.length > 0 ? 'white' : '#5d5e5e'}
        />
        <View style={[styles.root, { backgroundColor: backgroundColor}]}>
          <Background weakerLogo={true}/>
          <View style={styles.root_left}>
            <TextInput
              placeholder='Sök spelare...'
              placeholderTextColor='white'
              style={styles.search}
              onChangeText={setSearchPlayer}
              value={searchPlayer}
            />

            <ActivityIndicator size='large' style={{ paddingBottom: windowHeight * 0.4 }} />

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
                      minimumValue={0}
                      maximumValue={50}
                      minimumTrackTintColor='#078efb'
                      maximumTrackTintColor='#5d5e5e'
                      thumbTintColor='#078efb'
                      value={minAge}
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
                      minimumValue={0}
                      maximumValue={50}
                      minimumTrackTintColor='#078efb'
                      maximumTrackTintColor='#5d5e5e'
                      thumbTintColor='#078efb'
                      value={maxAge}
                      step={1}
                      onValueChange={value => setMaxAge(parseInt(value))}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.filters_UL, { marginTop: '1%' }]}>
                <View style={{ flex: 0.5, alignItems:'center', marginTop: '3%' }}>
                  <View style={{ flexDirection: 'row' }}>
                      <Text style={[styles.slider_text, { marginLeft: '15%' }]}>Spelade minuter</Text>
                      <TextInput
                        placeholder={0}
                        value={minutesPlayed}
                        style={styles.slider_text}
                        onChangeText={value => setMinutesPlayed(value)}
                      />
                    </View>
                    <Slider
                      style={{ width: windowWidth / 5, height: windowHeight / 20, marginLeft: '0%', marginBottom: '6%' }}
                      minimumValue={0}
                      maximumValue={1}
                      minimumTrackTintColor='#078efb'
                      maximumTrackTintColor='#5d5e5e'
                      thumbTintColor='#078efb'
                      value={0}
                      onValueChange={value => setMinutesPlayed(parseInt(value * 5000))}
                    />
                  </View>

                {/* Längd och fot */}
                <View style={{ flex: 0.5, marginLeft: '3%', marginBottom: '2.5%', flexDirection: 'row' }}>

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
                      minimumValue={100}
                      maximumValue={250}
                      minimumTrackTintColor='#078efb'
                      maximumTrackTintColor='#5d5e5e'
                      thumbTintColor='#078efb'
                      value={100}
                      onValueChange={value => setMinHeight(parseInt(value))}
                    />
                  </View>

                  {/* Fot */}
                  <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: '3%' }}>
                    <Text style={styles.slider_text}>Fot: </Text>
                    <TouchableOpacity
                      style={{ marginLeft: '10%' }}
                      onPress={() => { setLeftFoot(!leftFoot) }}
                    >
                      <Text style={[styles.slider_text, { color: (leftFoot ? '#ffe00f' : 'white') }]}>
                        Vänster
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: '10%' }}
                      onPress={() => { setRightFoot(!rightFoot) }}
                    >
                      <Text style={[styles.slider_text, { color: (rightFoot ? '#ffe00f' : 'white') }]}>Höger

                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>
            <View style={styles.filters_L}>
              <PlayerField func={changeField} mall={false} field={field} clearField={clearField} />
            </View>
          </View>

        </View>

        <Footer />

      </View>
    )
  } else {
    {/* VIEW TO RETURN IF FILTER BUTTON IS PRESSED */}
    if (filterPressed) {
      return (

        <View style={{ flexDirection: 'column' }}>
          <Header
            setFilterPressed={setFilterPressed}
            filterPressed={filterPressed}
            header={styles.header}
            nav={props.navigation}
            stackIndex={0}
            players={selectedPlayersWithID}
            player_dashboard={selectedPlayersWithID[0]}
            nextIsOK_dashboard={selectedPlayersWithID.length === 1 ? 'white' : '#5d5e5e'}
            nextIsOK_spider={(selectedPlayersWithID.length > 0 && selectedPlayersWithID.length < 5) ? 'white' : '#5d5e5e'}
          />

          <View style={[styles.root, { backgroundColor: backgroundColor}]}>
            
          <Background weakerLogo={true}/>

            <View style={styles.root_left}>
              <TextInput
                placeholder='Sök spelare...'
                placeholderTextColor='white'
                style={styles.search}
                onChangeText={setSearchPlayer}
                value={searchPlayer}
              />
              <View style={{ flex:0.05, flexDirection: 'row', width: '75%', justifyContent:'center', alignItems:'center' }}>
                <Text style={[styles.text_filters, { flex: 0.5, textAlign: 'center' }]}> Visar {selectedPlayersLength} av {totalPlayersLength}</Text>
                <View style={{ flex: 0.5 }}>
                  <TouchableOpacity
                    style={{ backgroundColor: '#0059a1', marginHorizontal: '20%', borderRadius: 100 }}
                    onPress={() => { setToggleSelectedPlayers(!toggleSelectedPlayers) }}
                  >
                    <Text style={{ textAlign: 'center', color: toggleSelectedPlayers ? '#ffe00f' : 'white', fontFamily: 'VitesseSans-Book', fontSize: 17, fontWeight: 'bold' }}>Visa valda</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex:0.9, width:'75%'}}>
                <FlatList
                  // Filter players by Name, Team, Age, Position and Minutes played
                  data={toggleSelectedPlayers
                    ? selectedPlayersWithID.filter((player) =>
                      (fix(player.Player.toLowerCase()).includes(searchPlayer.toLowerCase()) &&
                                                player['Team within selected timeframe'].toLowerCase().includes(searchTeam.toLowerCase()) &&
                                                (player.Age >= minAge && player.Age <= maxAge) &&
                                                fixPlayerPositions(player.Position.toLowerCase()).includes(searchPosition.toLowerCase()) &&
                                                player['Minutes played'] >= minutesPlayed &&
                                                player.Height >= minHeight &&
                                                checkFoot(player, leftFoot, rightFoot)) &&
                                                (field.some(ele => player.Position.toLowerCase().includes(ele)) || field.length === 0)
                    )
                    : playersFiltered.length > 0
                      ? playersFiltered.filter((player) =>
                        (fix(player.Player.toLowerCase()).includes(searchPlayer.toLowerCase()) &&
                                              player['Team within selected timeframe'].toLowerCase().includes(searchTeam.toLowerCase()) &&
                                              (player.Age >= minAge && player.Age <= maxAge) &&
                                              fixPlayerPositions(player.Position.toLowerCase()).includes(searchPosition.toLowerCase()) &&
                                              player['Minutes played'] >= minutesPlayed &&
                                              player.Height >= minHeight &&
                                              checkFoot(player, leftFoot, rightFoot)) &&
                                              (field.some(ele => player.Position.toLowerCase().includes(ele)) || field.length === 0)
                      )

                      : players.filter((player) =>
                        (fix(player.Player.toLowerCase()).includes(searchPlayer.toLowerCase()) &&
                                                player['Team within selected timeframe'].toLowerCase().includes(searchTeam.toLowerCase()) &&
                                                (player.Age >= minAge && player.Age <= maxAge) &&
                                                fixPlayerPositions(player.Position.toLowerCase()).includes(searchPosition.toLowerCase()) &&
                                                player['Minutes played'] >= minutesPlayed &&
                                                player.Height >= minHeight &&
                                                checkFoot(player, leftFoot, rightFoot)) &&
                                                (field.some(ele => player.Position.toLowerCase().includes(ele)) || field.length === 0)
                      )}
                  renderItem={({ item }) => {
                    const textColor = selectedPlayersWithID.includes(item) ? '#ffe00f' : 'white'
                    return (
                      <View style={styles.players_TO}>
                        <TouchableOpacity
                          onPress={() => { setPlayer(item) }}
                          style={{ justifyContent: 'center' }}
                        >

                          <View style={styles.players_V}>
                            <View style={styles.players_V_L}>
                              <Text style={[styles.text_L, { color: textColor }]}>{item.Player}</Text>
                            </View>
                            <View style={styles.players_V_R}>
                              <Text style={[styles.text_R, { color: textColor }]}>{item['Team within selected timeframe']}</Text>
                              <Text style={[styles.text_R, { color: textColor }]}>, </Text>
                              <Text style={[styles.text_R, { color: textColor }]}>{item.League}</Text>
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
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>

            <View style={styles.root_right}>
              <Filters setPlayersFiltered={setPlayersFiltered} playersFiltered={playersFiltered} filters={filters} setFilters={setFilters} />
            </View>
          </View>
          
          <Footer />
        </View>
      )
    } else {
      {/* NORMAL VIEW (NO FILTER PRESSED AND PLAYERS LOADED) */}
      return (

        <View style={{ flexDirection: 'column' }}>
          <Header
            setFilterPressed={setFilterPressed}
            filterPressed={filterPressed}
            header={styles.header}
            nav={props.navigation}
            stackIndex={0}
            players={selectedPlayersWithID}
            player_dashboard={selectedPlayersWithID[0]}
            nextIsOK_dashboard={selectedPlayersWithID.length === 1 ? 'white' : '#5d5e5e'}
            nextIsOK_spider={(selectedPlayersWithID.length > 0 && selectedPlayersWithID.length < 5) ? 'white' : '#5d5e5e'}
          />

          <View style={[styles.root, { backgroundColor: backgroundColor}]}>
            
          <Background weakerLogo={true}/>
            <View style={styles.root_left}>
              <TextInput
                placeholder='Sök spelare...'
                placeholderTextColor='white'
                style={styles.search}
                onChangeText={setSearchPlayer}
                value={searchPlayer}
              />
              <View style={{ flex:0.05,flexDirection: 'row', width:'75%', justifyContent:'center', alignItems:'center' }}>
                <Text style={[styles.text_filters, { flex: 0.5, textAlign: 'center' }]}> Visar {selectedPlayersLength} av {totalPlayersLength}</Text>
                <View style={{ flex: 0.5 }}>
                  <TouchableOpacity
                    style={{ backgroundColor: '#0059a1', marginHorizontal: '20%', borderRadius: 100 }}
                    onPress={() => { setToggleSelectedPlayers(!toggleSelectedPlayers) }}
                  >
                    <Text style={{ textAlign: 'center', color: toggleSelectedPlayers ? '#ffe00f' : 'white', fontFamily: 'VitesseSans-Book', fontSize: 17, fontWeight: 'bold' }}>Visa valda</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex:0.9, width:'75%'}}>
                <FlatList
                  // Filter players by Name, Team, Age, Position and Minutes played
                  data={toggleSelectedPlayers
                    ? selectedPlayersWithID.filter((player) =>
                      (fix(player.Player.toLowerCase()).includes(searchPlayer.toLowerCase()) &&
                                                player['Team within selected timeframe'].toLowerCase().includes(searchTeam.toLowerCase()) &&
                                                (player.Age >= minAge && player.Age <= maxAge) &&
                                                fixPlayerPositions(player.Position.toLowerCase()).includes(searchPosition.toLowerCase()) &&
                                                player['Minutes played'] >= minutesPlayed &&
                                                player.Height >= minHeight &&
                                                checkFoot(player, leftFoot, rightFoot)) &&
                                                (field.some(ele => player.Position.toLowerCase().includes(ele)) || field.length === 0)
                    )
                    : playersFiltered.length > 0
                      ? playersFiltered.filter((player) =>
                        (fix(player.Player.toLowerCase()).includes(searchPlayer.toLowerCase()) &&
                                              player['Team within selected timeframe'].toLowerCase().includes(searchTeam.toLowerCase()) &&
                                              (player.Age >= minAge && player.Age <= maxAge) &&
                                              fixPlayerPositions(player.Position.toLowerCase()).includes(searchPosition.toLowerCase()) &&
                                              player['Minutes played'] >= minutesPlayed &&
                                              player.Height >= minHeight &&
                                              checkFoot(player, leftFoot, rightFoot)) &&
                                              (field.some(ele => player.Position.toLowerCase().includes(ele)) || field.length === 0)
                      )

                      : players.filter((player) =>
                        (fix(player.Player.toLowerCase()).includes(searchPlayer.toLowerCase()) &&
                                                player['Team within selected timeframe'].toLowerCase().includes(searchTeam.toLowerCase()) &&
                                                (player.Age >= minAge && player.Age <= maxAge) &&
                                                fixPlayerPositions(player.Position.toLowerCase()).includes(searchPosition.toLowerCase()) &&
                                                player['Minutes played'] >= minutesPlayed &&
                                                player.Height >= minHeight &&
                                                checkFoot(player, leftFoot, rightFoot)) &&
                                                (field.some(ele => player.Position.toLowerCase().includes(ele)) || field.length === 0)
                      )}
                  renderItem={({ item }) => {
                    const textColor = selectedPlayersWithID.includes(item) ? '#ffe00f' : 'white'
                    return (
                      <View style={styles.players_TO}>
                        <TouchableOpacity
                          onPress={() => { setPlayer(item) }}
                          style={{ justifyContent: 'center' }}
                        >

                          <View style={styles.players_V}>
                            <View style={styles.players_V_L}>
                              <Text style={[styles.text_L, { color: textColor }]}>{item.Player}</Text>
                            </View>
                            <View style={styles.players_V_R}>
                              <Text style={[styles.text_R, { color: textColor }]}>{item['Team within selected timeframe']}</Text>
                              <Text style={[styles.text_R, { color: textColor }]}>, </Text>
                              <Text style={[styles.text_R, { color: textColor }]}>{item.League}</Text>
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
                  showsVerticalScrollIndicator={false}
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
                        minimumValue={0}
                        maximumValue={50}
                        minimumTrackTintColor='#078efb'
                        maximumTrackTintColor='#5d5e5e'
                        thumbTintColor='#078efb'
                        value={minAge}
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
                        minimumValue={0}
                        maximumValue={50}
                        minimumTrackTintColor='#078efb'
                        maximumTrackTintColor='#5d5e5e'
                        thumbTintColor='#078efb'
                        value={maxAge}
                        step={1}
                        onValueChange={value => setMaxAge(parseInt(value))}
                      />
                    </View>
                  </View>
                </View>
                <View style={[styles.filters_UL, { marginTop: '1%' }]}>
                  <View style={{ flex: 0.5, alignItems:'center', marginTop: '3%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[styles.slider_text, { marginLeft: '15%' }]}>Spelade minuter</Text>
                      <TextInput
                        placeholder={0}
                        value={minutesPlayed}
                        style={styles.slider_text}
                        onChangeText={value => setMinutesPlayed(value)}
                      />
                    </View>
                    <Slider
                      style={{ width: windowWidth / 5, height: windowHeight / 20, marginLeft: '0%', marginBottom: '6%' }}
                      minimumValue={0}
                      maximumValue={1}
                      minimumTrackTintColor='#078efb'
                      maximumTrackTintColor='#5d5e5e'
                      thumbTintColor='#078efb'
                      value={0}
                      onValueChange={value => setMinutesPlayed(parseInt(value * 5000))}
                    />
                  </View>

                  {/* Längd och fot */}
                  <View style={{ flex: 0.5, paddingLeft: '3%', marginBottom: '2.5%', flexDirection: 'row' }}>
                    

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
                        minimumValue={100}
                        maximumValue={250}
                        minimumTrackTintColor='#078efb'
                        maximumTrackTintColor='#5d5e5e'
                        thumbTintColor='#078efb'
                        value={100}
                        onValueChange={value => setMinHeight(parseInt(value))}
                      />
                    </View>

                    {/* Fot */}
                    <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: '3%' }}>
                      <Text style={styles.slider_text}>Fot: </Text>
                      <TouchableOpacity
                        style={{ marginLeft: '10%' }}
                        onPress={() => { setLeftFoot(!leftFoot) }}
                      >
                        <Text style={[styles.slider_text, { color: (leftFoot ? '#ffe00f' : 'white') }]}>
                          Vänster
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ marginLeft: '10%' }}
                        onPress={() => { setRightFoot(!rightFoot) }}
                      >
                        <Text style={[styles.slider_text, { color: (rightFoot ? '#ffe00f' : 'white') }]}>Höger

                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              </View>
              <View style={styles.filters_L}>
                <PlayerField func={changeField} mall={false} field={field} clearField={clearField} />
              </View>
            </View>
          </View>
          <Footer />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  root: {
    width: windowWidth,
    height: windowHeight * 0.8,
    flexDirection: 'row'
  },
  root_left: {
    flex: 0.45,
    alignItems: 'left',
    marginVertical: '1%',
    marginHorizontal: '2%'

  },
  root_right: {
    flex: 0.55,
    marginVertical: '1%'
  },
  players_TO: {
    height: windowHeight / 20,
    borderRadius: 100,
    backgroundColor: '#5d5e5e',
    marginVertical: '1%'
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
    fontSize: windowWidth / 140,
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
  },
  search: {
    flex:0.05,
    width: '75%',
    paddingLeft: '2%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    fontSize: windowHeight * 0.02,
    fontWeight: 'bold',
    backgroundColor: '#5d5e5e',
    color: 'white',
    fontFamily: 'VitesseSans-Book'
  },
  search_small: {
    flex: 0.5,
    padding: '2%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    fontSize: windowHeight * 0.02,
    fontWeight: 'bold',
    backgroundColor: '#5d5e5e',
    color: 'white',
    fontFamily: 'VitesseSans-Book'
  },
  filters_UL: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '80%',
    height: '20%'
  },
  selected_text: {
    flex: 0.1
  },
  text_filters: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'VitesseSans-Book'
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
