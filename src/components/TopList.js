import { useState, useEffect } from 'react'
import { getTopList } from '../data'
import { Dimensions, FlatList, View, Text, StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function TopList ({ position, player }) {
  const [playersList, setPlayersList] = useState(null)
  const list_rank = 1

  useEffect(() => {
    getTopList(position)
      .then((response) => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
          .then((data) => {
            data = data[1]

            let id = 1
            for (const object in data) {
              data[object].id = id
              id += 1
            }

            setPlayersList(data)
          })
      })
  }, [])

  if (playersList == null) {
    return (
      <View>
        <Text style={styles.rating_text}>
          Loading...
        </Text>
      </View>
    )
  } else {
    return (
      <View style={{ height: '100%', width: '100%' }}>
        <View>
          <FlatList
            data={playersList}
            renderItem={({ item }) => {
              const boldText = player == item.Player ? 'bold' : 'normal'
              return (
                <View style={styles.player}>
                  <View style={{ flex: 0.8 }}>
                    <Text style={[styles.small_text, { fontWeight: boldText }]}>{item.id}. {item.Player}</Text>
                  </View>
                  <View style={{ flex: 0.2 }}>
                    <Text style={[styles.rating_text, { fontWeight: boldText }]}>{item['Rating as ' + position]}</Text>
                  </View>

                </View>
              )
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  player: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: '1%'
  },

  small_text: {
    fontSize: windowWidth / 90,
    fontFamily: 'VitesseSans-Book',
    textAlign: 'left',
    color: 'white'
  },

  rating_text: {
    fontSize: windowWidth / 90,
    color: 'white',
    fontFamily: 'VitesseSans-Book',
    textAlign: 'right'
  }
})
