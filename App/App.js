import React, { Component } from 'react'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/lib/integration/react'
// import { store, persistor } from 'App/Stores'
import { store, persistor } from './Stores/CreateStore'
import RootScreen from './Containers/Root/RootScreen'
import AppNavigator from 'App/Navigators/AppNavigator'
import SocketManager from './Config/SocketManager'

// const { store, persistor } = createStore()

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
    console.disableYellowBox = true
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SocketManager />
            <AppNavigator />
        </PersistGate>
      </Provider>
    )
  }
}
