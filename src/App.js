// Stack navigator

// react-navigation imports
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

// Screens in navigator
import ChoosePlayer from "./screens/ChoosePlayer"

const App = createStackNavigator(
  {
    ChoosePlayer: ChoosePlayer
  }
)

const container = createAppContainer(App)

export default container;
