import React, { Component } from 'react'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/lib/integration/react'
import createStore from 'App/Stores'
import io from 'socket.io-client'
import RootScreen from './Containers/Root/RootScreen'
import AppNavigator from 'App/Navigators/AppNavigator'
import BaseURL from './Config/BaseURL'

const { store, persistor } = createStore()

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
    console.disableYellowBox = true
    io(BaseURL.api)
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    )
  }
}
