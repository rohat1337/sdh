import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { roundMarketValue } from '../../data'

const windowWidth = Dimensions.get('window').width

function InfoSquare (props) {
  if (props.player == null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  } else {
    return (
      <View>
        <Text style={styles.slider_text}>
          {Object.values(props.player.Player)}, {Object.values(props.player['Team within selected timeframe'])}
        </Text>

        <Text style={styles.slider_text}>
          Ålder: {Object.values(props.player.Age)}
        </Text>

        <Text style={styles.slider_text}>
          {Object.values(props.player.Position)}
        </Text>

        <Text style={styles.slider_text}>
          Längd: {Object.values(props.player.Height)}cm
        </Text>

        <Text style={styles.slider_text}>
          Vikt: {Object.values(props.player.Weight)}kg
        </Text>

        <Text style={styles.slider_text}>
          Marknadsvärde: {'\u20AC'}{roundMarketValue(Object.values(props.player['Market value']))}M
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  slider_text: {
    fontSize: windowWidth / 50,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    color: 'white',
    fontFamily: 'VitesseSans-Book',
    marginVertical: '1%'
  }

})
export default InfoSquare
