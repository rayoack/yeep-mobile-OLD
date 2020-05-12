import React from 'react';
import { Image } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Images, Colors } from 'App/Theme'
import { translate } from '../Locales'

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
  EventDetailsScreen,
  EditEventScreen
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
                <Image style={{ height: 30, width: 30 }} source={Images.my_event_active}/>
              ) : (
                <Image style={{ height: 30, width: 30 }} source={Images.my_event_inactive}/>
              )}
            </>
          )
        },
        title: translate('myEventsTabLabel')
      }
    },
    PlacesScreen: {
      screen: PlacesScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? (
                <Image style={{ height: 30, width: 30 }} source={Images.place_active}/>
              ) : (
                <Image style={{ height: 30, width: 30 }} source={Images.place_inactive}/>
              )}
            </>
          )
        },
        title: translate('spacesTabLabel')
      }
    },
    ProvidersScreen: {
      screen: ProvidersScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? (
                <Image style={{ height: 30, width: 30 }} source={Images.dj_active}/>
              ) : (
                <Image style={{ height: 30, width: 30 }} source={Images.dj_inactive}/>
              )}
            </>
          )
        },
        title: translate('servicesTabLabel')
      }
    },
  },
  {
    initialRouteName: 'MyEventsScreen',
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: Colors.labelBlack,
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
    SplashScreen: SplashScreen,
    EventDetailsScreen: { screen: EventDetailsScreen },
    EditEventScreen: { screen: EditEventScreen },
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
