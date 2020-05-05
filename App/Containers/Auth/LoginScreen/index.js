import React from 'react'
import { Platform, BackHandler, Keyboard, Alert  } from 'react-native'
import { connect } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as RNLocalize from "react-native-localize";
import { PropTypes } from 'prop-types'
import { Images, Colors } from 'App/Theme'

import { Creators as AuthActions } from '../../../Stores/reducers/auth'

import api from '../../../Services/api'
import { translate } from '../../../Locales'

import {
  ButtonWithBackground,
  BackButton,
  CustomInput
} from '../../../Components'

import {
  Container,
  Logo,
  TopContainer,
  Footer,
  AskRegisterText,
  SignupText
} from './styles'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyboardIsOpen: false,
      loading: false,
    }
  }


  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    return this.setState({ keyboardIsOpen: true })
  }

  _keyboardDidHide = () => {
    return this.setState({ keyboardIsOpen: false })
  }

  handleBackButton = () => {
    this.props.navigation.navigate('AccessScreen');
    return true;
  }

  SignIn = async (values) => {
    const { email, password } = values

    this.setState({ loading: true })

    try {
      const { data } = await api.post('/sessions', { email, password } )

      this.props.setSigned({ ...data.user, token: data.token })

      if(data.user.role == 'organizer') {
        this.setState({ loading: false })
        this.props.navigation.navigate('MyEventsScreen')
      }

    } catch (error) {
      this.setState({ loading: false })
      Alert.alert(
        translate('loginErrorTitle'),
        translate('loginErrorMessage'),
        [
          {text: 'Ok', onPress: () => console.log({error})}
        ],
        // {cancelable: false},
      );
    }
    // Keyboard.dismiss
  }

  render() {
    const { keyboardIsOpen, loading } = this.state

    return (
      <Container>
        <TopContainer>
          {/* <BackButton
            size={40}
            color={'black'}
            paddingTop={20}
          /> */}

          <Logo
            source={Images.logo}
          />
        </TopContainer>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => this.SignIn(values)}
          validationSchema={
            Yup.object().shape({
              email: Yup
                .string()
                .email(translate('emailNotValid'))
                .required(translate('emailRequired')),
              password: Yup
                .string()
                .required(translate('passwordRequired'))
                .min(6, translate('passwordMin'))
            })
          }
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched
          }) => (
            <>
              <CustomInput
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder={translate('yourEmail')}
                marginBottom={20}
                error={touched.email && errors.email}
                onBlur={() => setFieldTouched('email')}
                errorText={errors.email}
                autoCapitalize={'none'}
              />

              <CustomInput
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                placeholder={translate('yourPassword')}
                marginBottom={30}
                secureTextEntry={true}
                error={touched.password && errors.password}
                errorText={errors.password}
              />

              <ButtonWithBackground
                onPress={handleSubmit}
                text={translate('signIn')}
                backgroundColor={Colors.primary}
                textColor={Colors.white}
                disabled={loading}
                loading={loading}
                loadingSize={'small'}
                loadingColor={'#fff'}
              />
            </>
          )}
        </Formik>

        {!keyboardIsOpen ?
          <Footer>
            <AskRegisterText>{translate('dontHaveAccount')}</AskRegisterText>
            <SignupText>{translate('signupHere')}</SignupText>
          </Footer>
        : null}
      </Container>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

LoginScreen.propTypes = {
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})


export default connect(
  mapStateToProps, {
    ...AuthActions
  }
)(LoginScreen)
