import { Dimensions } from 'react-native'
import { Dot } from 'recharts'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function MyDot ({ cx, cy, clr }) {
  return (
    <Dot cx={cx} cy={cy} r={windowWidth * 0.007} fill={clr} />
  )
}
