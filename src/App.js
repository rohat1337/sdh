// Stack navigator

// react-navigation imports
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

// Screens in navigator
import ChoosePlayer from "./screens/ChoosePlayer"
import ChooseStats from "./screens/ChooseStats"

const App = createStackNavigator({
    ChoosePlayer: {
      screen: ChoosePlayer,
      navigationOptions: { headerShown: false }
    },
    ChooseStats: {
      screen: ChooseStats,
      navigationOptions: { headerShown: false }
    }
})

const container = createAppContainer(App)

export default container;
