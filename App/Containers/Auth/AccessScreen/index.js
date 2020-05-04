import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import { translate } from '../../../Locales'
import * as RNLocalize from "react-native-localize";

import {
  ButtonWithBackground
} from '../../../Components'

import {
  Container,
  Logo,
  LoginButtonContainer,
  LoginEmailButtonContainer,
  LoginEmailButtonText,
  Footer,
  AskRegisterText,
  SignupText
} from './styles'

class AccessScreen extends React.Component {
  componentDidMount() {
  }

  navigateToLogin = () => {
    const { navigation } = this.props

    return navigation.navigate('LoginScreen')
  }

  render() {
    return (
      <Container>
        <Logo
          source={require('../../../Assets/Images/yeep-logo-2.png')}
        />

        <LoginButtonContainer>
          <ButtonWithBackground
            onPress={this.navigateToLogin}
            text={translate('loginWithEmail')}
            backgroundColor={'#8965A3'}
            textColor={'#fff'}
          />
        </LoginButtonContainer>

        <Footer>
          <AskRegisterText>{translate('dontHaveAccount')}</AskRegisterText>
          <SignupText>{translate('signupHere')}</SignupText>
        </Footer>
      </Container>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

AccessScreen.propTypes = {
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccessScreen)
