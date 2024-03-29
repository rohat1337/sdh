import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import PlayerField from './PlayerField'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function MallCS (props) {
  return (
    <View style={styles.container}>
      <View style={styles.fieldView}>

        <PlayerField func={props.func} button={props.button} mall clearField={props.clearField} />

      </View>
      <View style={styles.buttonsView}>
        <TouchableOpacity
          disabled={!props.spiderOK}
          style={[styles.graphButton, { backgroundColor: props.spiderOK ? 'gray' : '#292929' }]}
          onPress={() => props.nav.navigate('Spider', { players: props.players, stats: props.stats, pos: props.pos, manual: false })}
        >
          <Text style={styles.text}>Spindel</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  graphButton: {
    height: windowHeight / 10,
    width: windowWidth / 10,
    backgroundColor: 'gray',
    borderRadius: 20,
    justifyContent: 'center'
  },
  text: {
    fontSize: windowHeight / 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'VitesseSans-Book'
  },
  container: {
    width: windowWidth,
    height: windowHeight * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonsView: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.8,
    marginTop: '5%',
    alignItems: 'center'
  },
  fieldView: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.8,
    marginTop: '5%',
    alignItems: 'center'
  }
})
