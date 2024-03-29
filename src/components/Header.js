import { render } from '@testing-library/react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

function Header (props) {

  function renderTitle() {
    let theme = localStorage.getItem("theme")

    if (theme === "odense") {
      return (<Text style={styles.header}>Odense BK Datahub</Text>)
    }
    else {
      return (<Text style={styles.header}>IK Sirius Datahub</Text>)
    }
  }
  // ChoosePlayer header
  if (props.stackIndex === 0) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'space-evenly' }}>

        <TouchableOpacity style={styles.logout_button}
                            onPress={() => {
                              localStorage.removeItem("access_token")
                              props.nav.navigate("Login")
                            }}>
          <Text style={styles.small_text}>Logga ut</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => props.setFilterPressed(!props.filterPressed)}>
          <Text style={[styles.small_text, { color: props.filterPressed ? 'gold' : 'white' }]}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => props.nav.navigate('SiriusPlayers')} >
          <Text style={[styles.small_text, {color: 'white'}]}>Trendlinje</Text>
        </TouchableOpacity>

        </View>

        <View style={{ flex: 0.5 }}>
          {renderTitle()}
        </View>

        <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            onPress={() => props.nextIsOK_dashboard === 'white' ? props.nav.navigate('Dashboard', { player_id: props.player_dashboard.index }) : {}}
          >

            <Text style={[styles.small_text, { color: props.nextIsOK_dashboard }]}>Dashboard / Ratings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.nextIsOK_spider === 'white' ? props.nav.navigate('ChooseStats', { players: props.players }) : {}}
          >

            <Text style={[styles.small_text, { color: props.nextIsOK_spider }]}> KPI:er -{'>'} </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
    // ChooseStats header
  } else if (props.stackIndex === 1) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            onPress={() => props.nav.goBack()}
          >
            <Text style={[styles.small_text, { color: 'white' }]}>
              {'<'}- Tillbaka
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.8 }}>
          {renderTitle()}
        </View>
        <View style={{ flex: 0.1 }} />

      </View>
    )
    // Dashboard header
  } else if (props.stackIndex === 2) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            onPress={() => props.nav.goBack()}
          >
            <Text style={[styles.small_text, { color: 'white' }]}>
              {'<'}- Tillbaka
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.8 }}>
          {renderTitle()}
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity onPress={() => {
            props.nav.navigate('Ratings', { player_id: props.player_id })
          }}
          >
            <Text style={[styles.small_text, { color: 'white' }]}>Ratings {'->'}</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
    // Spider
  } else if (props.stackIndex === 3) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            onPress={() => props.nav.goBack()}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.025, fontFamily: 'VitesseSans-Book' }}>
              {'<'}- Tillbaka
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.8 }}>
          {renderTitle()}
        </View>

        <View style={{ flex: 0.1 }}>

          <TouchableOpacity onPress={() => props.setSettingsPressed(!props.settingsPressed)}>
            <Text style={[styles.small_text, { color: props.settingsPressed ? 'yellow' : 'white' }]}>Inställningar</Text>
          </TouchableOpacity>

        </View>

      </View>
    )
  } else if (props.stackIndex === 4) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.1, justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => props.nav.goBack()}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.025, fontFamily: 'VitesseSans-Book' }}>
              {'<'}- Tillbaka
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.8 }}>
          {renderTitle()}
        </View>

        <View style={{ flex: 0.1 }}>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  small_text: {
    fontWeight: 'bold',
    fontSize: windowWidth*0.015,
    fontFamily: 'VitesseSans-Book',
    color: 'white'
  },

  header: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'VitesseSans-Black',
    justifyContent: 'center',
    textAlign: 'center'
  },

  logout_button : {
    marginLeft: "10%",
  }
})



export default Header
