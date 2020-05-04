import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  ExampleScreen,
  SplashScreen,
  AccessScreen,
  LoginScreen,
  RoleSelectorScreen,
  RegisterScreen
} from '../Containers'

const AuthNavigator = createSwitchNavigator({
  AccessScreen,
  LoginScreen,
  RoleSelectorScreen,
  RegisterScreen
})

const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen: SplashScreen,
    // The main application screen is our "ExampleScreen". Feel free to replace it with your
    // own screen and remove the example.
    MainScreen: ExampleScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  }
)

const AppContainer = createSwitchNavigator({
  AuthRoutes: { screen: AuthNavigator },
  Stack: { screen: StackNavigator }
})

export default createAppContainer(AppContainer)
