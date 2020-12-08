import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Images, Colors } from 'App/Theme';
import { translate } from '../Locales';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabBar from '../Components';
import { SplashScreen, AccessScreen, LoginScreen, RoleSelectorScreen, RegisterScreen, AdressRegisterScreen, 
// USER
ProfileScreen, 
// ORGANIZER
MyEventsScreen, PlacesScreen, ProvidersScreen, SuccessRegisterScreen, EventDetailsScreen, EditEventScreen, CreationEventSteps, Calendar, PlacesFilterScreen, PlacesListScreen, PlaceDetailsScreen, MyEventsSelectScreen, ReserveForm, 
// HOST
MyPlacesScreen, HostScheduleScreen, 
// RESERVES
ReservesList, 
// CHAT
RoomChat, } from '../Containers';
const AuthNavigator = createSwitchNavigator({
    AccessScreen,
    LoginScreen,
    RoleSelectorScreen,
    RegisterScreen,
    AdressRegisterScreen,
    SuccessRegisterScreen,
});
const organizerTabs = {
    MyEventsScreen: {
        labelStyle: {
            color: '#5B37B7',
        },
        icon: {
            component: <Icon name={'window-close'} size={20}/>,
            activeColor: 'rgba(91,55,183,1)',
            inactiveColor: 'rgba(0,0,0,1)',
        },
        background: {
            activeColor: 'rgba(223,215,243,1)',
            inactiveColor: 'rgba(223,215,243,0)',
        },
    },
    PlacesScreen: {
        labelStyle: {
            color: '#1194AA',
        },
        icon: {
            component: <Icon name={'window-close'} size={20}/>,
            activeColor: 'rgba(17,148,170,1)',
            inactiveColor: 'rgba(0,0,0,1)',
        },
        background: {
            activeColor: 'rgba(207,235,239,1)',
            inactiveColor: 'rgba(207,235,239,0)',
        },
    },
    ProvidersScreen: {
        labelStyle: {
            color: '#1194AA',
        },
        icon: {
            component: <Icon name={'window-close'} size={20}/>,
            activeColor: 'rgba(17,148,170,1)',
            inactiveColor: 'rgba(0,0,0,1)',
        },
        background: {
            activeColor: 'rgba(207,235,239,1)',
            inactiveColor: 'rgba(207,235,239,0)',
        },
    },
};
const OrganizerNavigator = createBottomTabNavigator({
    MyEventsScreen: {
        screen: MyEventsScreen,
        navigationOptions: {
            tabBarIcon: ({ focused }) => {
                return (<>
              {focused ? (<Image style={{ height: 30, width: 30 }} source={Images.my_event_active}/>) : (<Image style={{ height: 30, width: 30 }} source={Images.my_event_inactive}/>)}
            </>);
            },
            title: translate('myEventsTabLabel')
        }
    },
    PlacesScreen: {
        screen: PlacesScreen,
        navigationOptions: {
            tabBarIcon: ({ focused }) => {
                return (<>
              {focused ? (<Image style={{ height: 30, width: 30 }} source={Images.place_active}/>) : (<Image style={{ height: 30, width: 30 }} source={Images.place_inactive}/>)}
            </>);
            },
            title: translate('spacesTabLabel')
        }
    },
    ProvidersScreen: {
        screen: ProvidersScreen,
        navigationOptions: {
            tabBarIcon: ({ focused }) => {
                return (<>
              {focused ? (<Image style={{ height: 30, width: 30 }} source={Images.dj_active}/>) : (<Image style={{ height: 30, width: 30 }} source={Images.dj_inactive}/>)}
            </>);
            },
            title: translate('servicesTabLabel')
        }
    },
}, {
    initialRouteName: 'MyEventsScreen',
    tabBarComponent: TabBar,
    tabBarOptions: {
        activeTintColor: Colors.labelBlack,
        inactiveTintColor: Colors.ligthGray,
        headerShown: false
    }
});
const HostNavigator = createBottomTabNavigator({
    MyPlacesScreen: {
        screen: MyPlacesScreen,
        navigationOptions: {
            tabBarIcon: ({ focused }) => {
                return (<>
              {focused ? (<Image style={{ height: 30, width: 30 }} source={Images.my_event_active}/>) : (<Image style={{ height: 30, width: 30 }} source={Images.my_event_inactive}/>)}
            </>);
            },
            title: translate('myEventsTabLabel')
        }
    },
    HostScheduleScreen: {
        screen: HostScheduleScreen,
        navigationOptions: {
            tabBarIcon: ({ focused }) => {
                return (<>
              {focused ? (<Image style={{ height: 30, width: 30 }} source={Images.place_active}/>) : (<Image style={{ height: 30, width: 30 }} source={Images.place_inactive}/>)}
            </>);
            },
            title: translate('spacesTabLabel')
        }
    },
}, {
    initialRouteName: 'MyPlacesScreen',
    tabBarComponent: TabBar,
    tabBarOptions: {
        activeTintColor: Colors.labelBlack,
        inactiveTintColor: Colors.ligthGray,
        headerShown: false
    }
});
const StackNavigator = createStackNavigator({
    auth: {
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
    CreationEventSteps: { screen: CreationEventSteps },
    Calendar: { screen: Calendar },
    PlacesFilterScreen: { screen: PlacesFilterScreen },
    PlacesListScreen: { screen: PlacesListScreen },
    PlaceDetailsScreen: { screen: PlaceDetailsScreen },
    MyEventsSelectScreen: { screen: MyEventsSelectScreen },
    ReserveForm: { screen: ReserveForm },
    ReservesList: { screen: ReservesList },
    RoomChat: { screen: RoomChat },
    ProfileScreen: { screen: ProfileScreen }
}, {
    initialRouteName: 'tabs',
    headerMode: 'none',
});
const AppContainer = createSwitchNavigator({
    AuthRoutes: { screen: AuthNavigator },
    OrganizerRoutes: { screen: OrganizerNavigator },
    Stack: { screen: StackNavigator }
});
export default createAppContainer(AppContainer);
