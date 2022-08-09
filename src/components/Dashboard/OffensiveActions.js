import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-web-hover'
import { Line } from 'rc-progress'
import { getFontSize } from '../../data'

export default function OffensiveActions (props) {
  if (props.player == null || props.maxStats == null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  } else {
    console.log(props.player_ranked)
    return (
      <View style={{ marginVertical: '2%' }}>
        <FlatList
          data={props.stats}
          renderItem={({ item }) => {
            let progressColor = ''
            const percentile = Object.values(props.player_ranked[item])

            if (percentile > 0.75) {
              progressColor = 'green'
            } else if (percentile < 0.25) {
              progressColor = 'red'
            } else {
              progressColor = 'yellow'
            }
            return (
              <View style={{ padding: '1%' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.slider_text_left}>{item}: {Object.values(props.player[item])}</Text>
                  <Text style={styles.slider_text_right}>MAX: {props.maxStats[item]}</Text>
                </View>
                <Line percent={percentile * 100} strokeWidth='2' strokeColor={progressColor} />
              </View>
            )
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  slider_text_left: {
    flex: 0.75,
    fontSize: getFontSize(),
    textAlign: 'left',
    color: 'white',
    fontFamily: 'VitesseSans-Book',
    marginVertical: '1%'
  },
  slider_text_right: {
    flex: 0.25,
    fontSize: getFontSize(),
    textAlign: 'right',
    color: 'white',
    fontFamily: 'VitesseSans-Book',
    marginVertical: '1%'
  }

})
