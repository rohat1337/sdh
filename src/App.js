// Stack navigator

// react-navigation imports
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

// Screens in navigator
import ChoosePlayer from "./screens/ChoosePlayer"

const App = createStackNavigator({
    ChoosePlayer: {
      screen: ChoosePlayer,
      navigationOptions: { headerShown: false }
    }
})

const container = createAppContainer(App)

export default container;
