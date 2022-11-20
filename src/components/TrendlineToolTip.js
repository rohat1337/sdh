import { View, Dimensions, StyleSheet } from 'react-native'
import { arrayRemove } from '../data'
import MyText from './MyText'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function TrendlineToolTip (props) {
    if (props.payload[0] != undefined) {
        const payload = props.pl.filter(o => o.Year == props.payload[0].payload.Year)
        let texts = payload.map((obj) => {
            let stat = arrayRemove(Object.keys(obj), "Year")[0]
            return (
                <View>
                    <MyText text={stat + " : " + obj[stat]} />
                </View>
            )
        })
        return (
          <View style={styles.container}>
            <MyText text={payload[0].Year} />
            {texts}
          </View>
        )
    }
    return null

}

const styles = StyleSheet.create({
  container: {
    minWidth: windowWidth * 0.125,
    height: windowHeight * 0.1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: windowWidth * 0.01
  }
})
