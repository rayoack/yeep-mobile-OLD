import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ApplicationStyles, Colors, Helpers, Images, Metrics } from 'App/Theme'
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

  navigateToRegister = () => {
    return this.props.navigation.navigate('RoleSelectorScreen')
  }

  render() {
    return (
      <Container>
        <Logo
          source={Images.logo}
        />

        <LoginButtonContainer>
          <ButtonWithBackground
            onPress={this.navigateToLogin}
            text={translate('loginWithEmail')}
            backgroundColor={Colors.primary}
            textColor={Colors.white}
          />
        </LoginButtonContainer>

        <Footer
          onPress={() => this.navigateToRegister()}
          activeOpacity={0.7}
        >
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
