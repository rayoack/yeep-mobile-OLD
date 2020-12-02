import React from 'react'
import { Platform, Text, TouchableOpacity, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import { Header } from '../../../Components'
import { translate } from '../../../Locales'
import * as RNLocalize from "react-native-localize";

// import { Container } from './styles'

class PlacesScreen extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <>
        <Header />

        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('PlacesFilterScreen')}>
            <Text>PlacesScreen</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }

}

PlacesScreen.propTypes = {
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesScreen)
