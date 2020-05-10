import React from 'react';
import { Image } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Images, Colors } from 'App/Theme'

import TabBar from '../Components'

import {
  ExampleScreen,
  SplashScreen,
  AccessScreen,
  LoginScreen,
  RoleSelectorScreen,
  RegisterScreen,
  AdressRegisterScreen,
  MyEventsScreen,
  OrganizerNegociations,
  PlacesScreen,
  ProvidersScreen,
  SuccessRegisterScreen,
  EventDetailsScreen
} from '../Containers'

const AuthNavigator = createSwitchNavigator({
  AccessScreen,
  LoginScreen,
  RoleSelectorScreen,
  RegisterScreen,
  AdressRegisterScreen,
  SuccessRegisterScreen,
})

const OrganizerNavigator = createBottomTabNavigator(
  {
    MyEventsScreen: {
      screen: MyEventsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? (
                <Image style={{ marginTop: 20, height: 30, width: 30 }} source={Images.my_event_active}/>
              ) : (
                <Image style={{ marginTop: 20, height: 30, width: 30 }} source={Images.my_event_inactive}/>
              )}
            </>
          )
        },
        title: ''
      }
    },
    OrganizerNegociations: {
      screen: OrganizerNegociations,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? (
                <Image style={{ marginTop: 20, height: 30, width: 30 }} source={Images.negociation_active}/>
              ) : (
                <Image style={{ marginTop: 20, height: 30, width: 30 }} source={Images.negociation_inactive}/>
              )}
            </>
          )
        },
        title: ''
      }
    },
    PlacesScreen: {
      screen: PlacesScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? (
                <Image style={{ marginTop: 20, height: 30, width: 30 }} source={Images.place_active}/>
              ) : (
                <Image style={{ marginTop: 20, height: 30, width: 30 }} source={Images.place_inactive}/>
              )}
            </>
          )
        },
        title: ''
      }
    },
    ProvidersScreen: {
      screen: ProvidersScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? (
                <Image style={{ marginTop: 20, height: 30, width: 30 }} source={Images.dj_active}/>
              ) : (
                <Image style={{ marginTop: 20, height: 30, width: 30 }} source={Images.dj_inactive}/>
              )}
            </>
          )
        },
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
      inactiveTintColor: Colors.ligthGray,
      headerShown: false
    }
  }
)

const StackNavigator = createStackNavigator(
  {
    auth:{
      screen: AuthNavigator,
      navigationOptions: {
        headerShown: false
      }
    },
    tabs: {
      screen: OrganizerNavigator,
      navigationOptions: {
        headerShown: false
      }
    },
    EventDetailsScreen: { screen: EventDetailsScreen },
    SplashScreen: SplashScreen,
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
