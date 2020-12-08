import React from 'react'
import { Platform, Text, View, Alert, Image, TouchableOpacity } from 'react-native'
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
  }

  componentDidMount() {

  }
  
  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Image style= {{width: 300, height: 300,marginTop: 30, marginBottom: 10}}source={Images.coming_soon} />
        <Text style={{fontFamily: 'Nunito Bold', fontSize: 25}}>Em breve</Text>
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
