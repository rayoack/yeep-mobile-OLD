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
    // io(BaseURL.api)
  }

  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api/Provider.md
       */
      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    )
  }
}
