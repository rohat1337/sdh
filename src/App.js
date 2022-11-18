// Stack navigator

// react-navigation imports
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

// Screens in navigator
import ChoosePlayer from './screens/ChoosePlayer'
import ChooseStats from './screens/ChooseStats'
import Dashboard from './screens/Dashboard'
import Spider from './screens/Spider'
import Ratings from './screens/Ratings'
import XYPlot from './screens/XYPlot'
import SiriusPlayers from './screens/SiriusPlayers'

import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
])

const App = createStackNavigator({

  ChoosePlayer: {
    screen: ChoosePlayer,
    navigationOptions: { headerShown: false }
  },
  ChooseStats: {
    screen: ChooseStats,
    navigationOptions: { headerShown: false }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: { headerShown: false }
  },
  Ratings: {
    screen: Ratings,
    navigationOptions: { headerShown: false }
  },
  Spider: {
    screen: Spider,
    navigationOptions: { headerShown: false }
  },
  XYPlot: {
    screen: XYPlot,
    navigationOptions: { headerShown: false }
  },
  SiriusPlayers: {
    screen: SiriusPlayers,
    navigationOptions: { headerShown: false }
  }

})

const container = createAppContainer(App)

export default container
