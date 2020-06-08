import React from 'react'
import { Platform, Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import api from '../../../Services/api'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import { translate } from '../../../Locales'
import { WebView } from 'react-native-webview';

// import { Container } from './styles'

class ProvidersScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.stateChange = _.debounce(this.stateChange, 1000)
  }

  componentDidMount() {

  }
  
  stateChange = async (state) => {
    console.log('state', state)
    if(state.url.includes('process?code')) {
      const { data: code } = await axios.get(`${state.url}`)

      try {
        
        const { data } = await api.post('/userToken', {
          code,
          updateMp: true
        }, {
          authorization: `Bearer ${this.props.user.token}`
        })

        console.log('data', data)

      } catch (error) {
        console.log({error})
        Alert.alert(translate('errorInRequest'))
      }
    } else {
      Alert.alert(translate('errorInRequest'))
    }

  }

  render() {
    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
      {/* <TouchableOpacity onPress={() => this.goToUrl()}>
        <Text>ProvidersScreen</Text>
      </TouchableOpacity> */}

      <WebView
        source={{
          uri: `https://auth.mercadopago.com.br/authorization?client_id=2797182559212984&response_type=code&platform_id=mp&redirect_uri=${encodeURI('https://f5b082d1fbef.ngrok.io/process')}`
      }}
        onNavigationStateChange={state => this.stateChange(state)}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator></ActivityIndicator>}
      />
    </View>
    )
  }

}

ProvidersScreen.propTypes = {
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProvidersScreen)
