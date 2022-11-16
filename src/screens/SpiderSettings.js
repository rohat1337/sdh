import { View, StyleSheet, Dimensions, Text, TouchableOpacity, FlatList } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function SpiderSettings (props) {
  function radarsContains (id, radars) {
    for (let i = 0; i < radars.length; i++) {
      if (radars[i].props.dataKey === id) {
        return true
      }
    }
    return false
  }

  if (props.settingsPressed && (props.radars != null)) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.container}>

          <View style={styles.row}>

            <Text style={styles.small_text}>Average: </Text>
            <TouchableOpacity
              disabled={props.avgOn}
              style={{ marginHorizontal: '3%' }}
              onPress={() => props.setAvgOn(true)}
            >
              <Text style={[styles.small_text, { color: props.avgOn ? 'gold' : 'white' }]}>PÅ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!props.avgOn || (props.radars.length == 1)}
              style={{ marginHorizontal: '3%' }}
              onPress={() => props.setAvgOn(false)}
            >
              <Text style={[styles.small_text, { color: props.avgOn ? 'white' : 'gold' }]}>AV</Text>
            </TouchableOpacity>

          </View>

          <FlatList
            data={props.players}
            keyExtractor={(item) => item.index}
            renderItem={({ item }) => {
              return (
                <View style={styles.row}>

                  <Text style={styles.small_text}>{item.Player}: </Text>
                  <TouchableOpacity
                    disabled={radarsContains(item.index, props.radars)}
                    style={{ marginHorizontal: '3%' }}
                    onPress={() => props.addToPlayerRadars(item, props.radars)}
                  >
                    <Text style={[styles.small_text, { color: radarsContains(item.index, props.radars) ? 'gold' : 'white' }]}>PÅ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={!radarsContains(item.index, props.radars) || (props.radars.length == 1)}
                    style={{ marginHorizontal: '3%' }}
                    onPress={() => props.removeFromPlayerRadars(item.index, props.radars)}
                  >
                    <Text style={[styles.small_text, { color: radarsContains(item.index, props.radars) ? 'white' : 'gold' }]}>AV</Text>
                  </TouchableOpacity>

                </View>
              )
            }}
          />

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
  }
})
