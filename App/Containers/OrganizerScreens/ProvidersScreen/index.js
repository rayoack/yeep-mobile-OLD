import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import { translate } from '../../../Locales'
import * as RNLocalize from "react-native-localize";

// import { Container } from './styles'

class ProvidersScreen extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View>
        <Text>ProvidersScreen</Text>
      </View>
    )
  }

}

ProvidersScreen.propTypes = {
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProvidersScreen)
