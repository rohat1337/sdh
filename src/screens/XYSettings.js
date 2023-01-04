import { View, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import './background.css'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function XYSettings (props) {
  const [xMin, setxMin] = useState(null)
  const [xMax, setxMax] = useState(null)
  const [yMin, setyMin] = useState(null)
  const [yMax, setyMax] = useState(null)

  if (props.settingsPressed) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.container}>

          <View style={styles.row}>

            <Text style={styles.small_text}>
              {props.stats[0]}:
            </Text>
            <TextInput
              style={styles.input}
              value={xMin}
              placeholder='Min'
              onChangeText={setxMin}
              textAlign='center'
            />
            <Text style={styles.small_text}>till</Text>
            <TextInput
              style={styles.input}
              value={xMax}
              placeholder='Max'
              onChangeText={setxMax}
              textAlign='center'
            />
          </View>

          <View style={styles.row}>

            <Text style={styles.small_text}>
              {props.stats[1]}:
            </Text>
            <TextInput
              style={styles.input}
              value={yMin}
              placeholder='Min'
              onChangeText={setyMin}
              textAlign='center'
            />
            <Text style={styles.small_text}>till</Text>
            <TextInput
              style={styles.input}
              value={yMax}
              placeholder='Max'
              onChangeText={setyMax}
              textAlign='center'
            />
          </View>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => props.setDomain([[parseFloat(xMin), parseFloat(xMax)], [parseFloat(yMin), parseFloat(yMax)]])}>
              <Text style={styles.small_text}>Tillämpa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => props.setDomain([[NaN, NaN], [NaN, NaN]])}>
              <Text style={styles.small_text}>Återställ</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.line} />
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.8,
    flexDirection: 'column',
    alignItems: 'center'
  },

  row: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    height: windowHeight * 0.05,
    marginVertical: '10%',
    justifyContent: 'space-evenly'
  },

  small_text: {
    fontWeight: 'bold',
    fontSize: windowWidth * 0.015,
    fontFamily: 'VitesseSans-Book',
    color: 'white'
  },

  line: {
    width: 3,
    height: windowHeight * 0.75,
    backgroundColor: 'gray',
    alignSelf: 'center'
  },

  input: {
    width: windowWidth * 0.03,
    height: windowHeight * 0.03,
    backgroundColor: '#bfc4c9',
    borderColor: 'white',
    borderWidth: 1
  }
})
