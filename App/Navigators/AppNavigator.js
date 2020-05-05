import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from 'App/Theme'

import TabBar from '../Components'

import {
  ExampleScreen,
  SplashScreen,
  AccessScreen,
  LoginScreen,
  RoleSelectorScreen,
  RegisterScreen,
  MyEventsScreen,
  OrganizerNegociations,
  PlacesScreen,
  ProvidersScreen
} from '../Containers'

const AuthNavigator = createSwitchNavigator({
  AccessScreen,
  LoginScreen,
  RoleSelectorScreen,
  RegisterScreen
})

const OrganizerNavigator = createBottomTabNavigator(
  {
    MyEventsScreen: {
      screen: MyEventsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon style={{ marginTop: 20 }} size={40} name="home-account" color={tintColor} />,
        title: ''
      }
    },
    OrganizerNegociations: {
      screen: OrganizerNegociations,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon style={{ marginTop: 20 }} size={40} name="plus-circle-outline" color={tintColor} />,
        title: ''
      }
    },
    PlacesScreen: {
      screen: PlacesScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon style={{ marginTop: 20 }} size={40} name="heart-box-outline" color={tintColor} />,
        title: ''
      }
    },
    ProvidersScreen: {
      screen: ProvidersScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon style={{ marginTop: 20 }} size={40} name="account-star" color={tintColor} />,
        title: ''
      }
    },
    // MoreScreen: {
    //   screen: MoreScreen,
    //   navigationOptions: {
    //     tabBarIcon: ({ tintColor }) => <IoniCons style={{ marginTop: 20 }} size={40} name="md-more" color={tintColor} />,
    //     title: ''
    //   }
    // },
  },
  {
    initialRouteName: 'MyEventsScreen',
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: "#2F2929",
      headerShown: false
    }
  }
)

const StackNavigator = createStackNavigator(
  {
    tabs: {
      screen: OrganizerNavigator,
      navigationOptions: {
        headerShown: false
      }
    },
    SplashScreen: SplashScreen,
    MainScreen: ExampleScreen,
  },
  {
    initialRouteName: 'tabs',
    headerMode: 'none',
  }
)

const AppContainer = createSwitchNavigator({
  AuthRoutes: { screen: AuthNavigator },
  OrganizerRoutes: { screen: OrganizerNavigator },
  Stack: { screen: StackNavigator }
})

export default createAppContainer(AppContainer)
