import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import { translate } from '../../Locales'
import * as RNLocalize from "react-native-localize";

// import { Container } from './styles'

class MyEventsScreen extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View>
        <Text>MyEventsScreen</Text>
      </View>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

MyEventsScreen.propTypes = {
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEventsScreen)
