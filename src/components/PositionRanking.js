import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { fixSuffix } from '../data'

const windowWidth = Dimensions.get('window').width

export default function PositionRanking ({ position, value, total }) {
  return (
    <View style={{ flexDirection: 'row', width: '100%', marginVertical: '2%', justifyContent: 'center' }}>
      <Text style={styles.small_text}>{position}: {value}{fixSuffix(value)} av {total} spelare</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  small_text: {
    fontSize: windowWidth / 50,
    fontWeight: 'bold',
    fontFamily: 'VitesseSans-Book',
    color: 'white'
  }
})
