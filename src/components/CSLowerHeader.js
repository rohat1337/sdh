import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function CSLowerHeader (props) {
  return (
    <View style={styles.secondHeader}>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: props.button ? '#0059a1' : '#001a30' }]}
        onPress={() => props.setButton(!props.button)}
        disabled={props.button}
      >
        <Text style={styles.text}>Välj KPI:er manuellt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: props.button ? '#001a30' : '#0059a1' }]}
        onPress={() => props.setButton(!props.button)}
        disabled={!props.button}
      >
        <Text style={styles.text}>Mallar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  secondHeader: {
    width: windowWidth,
    height: windowHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  buttons: {
    width: windowWidth / 4,
    height: windowHeight * 0.05,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: windowHeight / 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'VitesseSans-Book'
  }
})
