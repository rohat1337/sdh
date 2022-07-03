import { Text, View, TouchableOpacity, Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height

function Header (props) {
  // ChoosePlayer header
  if (props.stackIndex === 0) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.2 }} />

        <View style={{ flex: 0.6 }}>
          <Text style={{ fontSize: windowHeight * 0.045, fontWeight: 'bold', color: 'white', fontFamily: 'VitesseSans-Black' }}>IK Sirius Datahub</Text>
        </View>

        <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ marginRight: '10%' }} onPress={() => props.nav.navigate('Dashboard', { player_id: props.player_id["ID"] })}>

            <Text style={{ color: props.nextIsOK, fontWeight: 'bold', fontSize: windowHeight * 0.025, fontFamily: 'VitesseSans-Book' }}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.nextIsOK === 'white' ? props.nav.navigate('ChooseStats', { players: props.players }) : {}}
          >
            <Text style={{ color: props.nextIsOK, fontWeight: 'bold', fontSize: windowHeight * 0.025, fontFamily: 'VitesseSans-Book' }}>
              Nästa -{'>'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
    // ChooseStats header
  } else if (props.stackIndex === 1) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.2 }}>
          <TouchableOpacity
            onPress={() => props.nav.goBack()}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.025, fontFamily: 'VitesseSans-Book' }}>
              {'<'}- Tillbaka
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6 }}>
          <Text style={{ fontSize: windowHeight * 0.04, fontWeight: 'bold', color: 'white', fontFamily: 'VitesseSans-Black' }}>IK Sirius Datahub</Text>
        </View>
        <View style={{ flex: 0.2 }} />

      </View>
    )
  } else if (props.stackIndex === 2) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.2 }}>
          <TouchableOpacity
            onPress={() => props.nav.goBack()}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.025, fontFamily: 'VitesseSans-Book' }}>
              {'<'}- Tillbaks
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6 }}>
          <Text style={{ fontSize: windowHeight * 0.04, fontWeight: 'bold', color: 'white', fontFamily: 'VitesseSans-Black' }}>IK Sirius Datahub</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <TouchableOpacity
            onPress={() => props.nav.goBack()}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.025, fontFamily: 'VitesseSans-Book' }}>
              Nästa -{'>'}
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    )
  } else if (props.stackIndex === 2) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.2 }}>
          <TouchableOpacity
            onPress={() => props.nav.goBack()}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.025, fontFamily: 'VitesseSans-Book' }}>
              {'<'}- Tillbaka
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6, paddingRight: '10%' }}>
          <Text style={{ fontSize: windowHeight * 0.04, fontWeight: 'bold', color: 'white', fontFamily: 'VitesseSans-Black' }}>IK Sirius Datahub</Text>
        </View>

      </View>
    )
  }
}

export default Header
