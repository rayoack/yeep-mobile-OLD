import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import { Images, Colors } from 'App/Theme'
import { translate } from '../../../Locales'

class EditEventScreen extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.auth.user
})

export default connect(
  mapStateToProps
)(EditEventScreen)
