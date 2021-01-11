import React from 'react';
import { Image } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Images, Colors } from 'App/Theme'
import { translate } from '../Locales'
import { store } from '../Stores/CreateStore'

import { TabBar } from '../Components'

import {
  ExampleScreen,
  SplashScreen,
  AccessScreen,
  LoginScreen,
  RoleSelectorScreen,
  RegisterScreen,
  AdressRegisterScreen,
  // USER
  ProfileScreen,
  AccountsScreen,
  RegisterAccountsSteps,
  EditPFAccountScreen,
  BankList,
  UploadDocumentScreen,
  // ORGANIZER
  MyEventsScreen,
  OrganizerNegociations,
  PlacesScreen,
  ProvidersScreen,
  SuccessRegisterScreen,
  EventDetailsScreen,
  EditEventScreen,
  CreationEventSteps,
  Calendar,
  PlacesFilterScreen,
  PlacesListScreen,
  PlaceDetailsScreen,
  MyEventsSelectScreen,
  ReserveForm,
  ChatListScreen,
  // HOST
  MyPlacesScreen,
  HostScheduleScreen,
  // RESERVES
  ReservesList,
  ReserveDetails,
  // CHAT
  RoomChat,
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
                <Image style={{ height: 25, width: 25 }} source={Images.my_event_active}/>
              ) : (
                <Image style={{ height: 25, width: 25 }} source={Images.my_event_inactive}/>
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
                <Image style={{ height: 25, width: 25 }} source={Images.place_active}/>
              ) : (
                <Image style={{ height: 25, width: 25 }} source={Images.place_inactive}/>
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
                <Image style={{ height: 25, width: 25 }} source={Images.dj_active}/>
              ) : (
                <Image style={{ height: 25, width: 25 }} source={Images.dj_inactive}/>
              )}
            </>
          )
        },
        title: translate('servicesTabLabel')
      }
    },
    ChatListScreen: {
      screen: ChatListScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? (
                <Image style={{ height: 25, width: 25 }} source={Images.conversation_active}/>
              ) : (
                <Image style={{ height: 25, width: 25 }} source={Images.conversation_inactive}/>
              )}
            </>
          )
        },
        title: translate('messagesTabLabel')
      }
    },
  },
  {
    initialRouteName: 'MyEventsScreen',
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.labelBlack,
      headerShown: false
    }
  }
)

const HostNavigator = createBottomTabNavigator(
  {
    MyPlacesScreen: {
      screen: MyPlacesScreen,
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
        title: translate('mySpacesTabLabel')
      }
    },
    HostScheduleScreen: {
      screen: HostScheduleScreen,
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
        title: translate('hostScheduleTabLabel')
      }
    },
    ChatListScreen: {
      screen: ChatListScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? (
                <Image style={{ height: 25, width: 25 }} source={Images.conversation_active}/>
              ) : (
                <Image style={{ height: 25, width: 25 }} source={Images.conversation_inactive}/>
              )}
            </>
          )
        },
        title: translate('messagesTabLabel')
      }
    },
  },
  {
    initialRouteName: 'MyPlacesScreen',
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: Colors.labelBlack,
      inactiveTintColor: Colors.ligthGray,
      headerShown: false
    }
  }
)

const getInitialRoute = () => {
  const state = store.getState();
  const user = state.auth.user;

  if(!user && !user.token) return 'auth'

  if(user.role === 'organizer') {
    return 'tabs'
  } else if (user.role === 'owner') {
    return 'hostTabs'
  } else {
    return 'auth'
  }
}

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
    hostTabs: {
      screen: HostNavigator,
      navigationOptions: {
        headerShown: false
      }
    },
    SplashScreen: SplashScreen,
    EventDetailsScreen: { screen: EventDetailsScreen },
    EditEventScreen: { screen: EditEventScreen },
    CreationEventSteps: { screen: CreationEventSteps },
    Calendar: { screen: Calendar },
    PlacesFilterScreen: { screen: PlacesFilterScreen },
    PlacesListScreen: { screen: PlacesListScreen },
    PlaceDetailsScreen: { screen: PlaceDetailsScreen },
    MyEventsSelectScreen: { screen: MyEventsSelectScreen },
    ReserveForm: { screen: ReserveForm },
    ReservesList: { screen: ReservesList },
    ReserveDetails: { screen: ReserveDetails },
    RoomChat: { screen: RoomChat },
    ProfileScreen: { screen: ProfileScreen },
    AccountsScreen: { screen: AccountsScreen },
    RegisterAccountsSteps: { screen: RegisterAccountsSteps },
    EditPFAccountScreen: { screen: EditPFAccountScreen },
    BankList: { screen: BankList },
    UploadDocumentScreen: { screen: UploadDocumentScreen },
  },
  {
    initialRouteName: getInitialRoute(),
    headerMode: 'none',
  }
)

const AppContainer = createSwitchNavigator({
  AuthRoutes: { screen: AuthNavigator },
  OrganizerRoutes: { screen: OrganizerNavigator },
  HostRoutes: { screen: HostNavigator },
  Stack: { screen: StackNavigator }
})

export default createAppContainer(StackNavigator)
