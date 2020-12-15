import React from 'react'
import { Platform, Keyboard, ActivityIndicator, BackHandler, View } from 'react-native'
import { connect } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Creators as ManageUserActions } from '../../../Stores/reducers/manageUserReducer'

import { Images, Colors } from 'App/Theme'
import { translate } from '../../../Locales'
import * as RNLocalize from "react-native-localize";
import {
  ButtonWithBackground,
  CustomInput
} from '../../../Components'


import {
  Container,
  TopContainer,
  Logo,
  Footer,
  AskSignInText,
  SignInText,
  KeyboardAvoiding
} from './styles'


class RegisterScreen extends React.Component {
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

  setUserAndNavigate = (values) => {
    const { role } = this.props.user
    const user = { role, ...values }
    
    if(role) {
      this.props.setUser(user)

      this.props.navigation.navigate('AdressRegisterScreen')
    }
  }

  navigateToSigIn = () => {
    return this.props.navigation.navigate('LoginScreen')
  }

  render() {
    const { loading, keyboardIsOpen } = this.state

    return (
      <KeyboardAvoiding
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Container>
          <TopContainer>
            <Logo
              source={Images.logo}
            />
          </TopContainer>

          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            onSubmit={values => this.setUserAndNavigate(values)}
            validationSchema={
              Yup.object().shape({
                name: Yup
                  .string()
                  .required(translate('nameRequired')),
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
              <View style={{ width: '100%' }}>
                <CustomInput
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder={translate('yourName')}
                  marginBottom={20}
                  error={touched.name && errors.name}
                  onBlur={() => setFieldTouched('name')}
                  errorText={errors.name}
                />

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
                  text={translate('next')}
                  backgroundColor={Colors.primary}
                  textColor={Colors.white}
                  disabled={loading}
                  loading={loading}
                  loadingSize={'small'}
                  loadingColor={'#fff'}
                  width={"100%"}
                />
              </View>
            )}
          </Formik>

          {!keyboardIsOpen ?
            <Footer
              onPress={() => this.navigateToSigIn()}
              activeOpacity={0.7}
            >
              <AskSignInText>{translate('haveAccount')}</AskSignInText>
              <SignInText>{translate('signInHere')}</SignInText>
            </Footer>
          : null}
          <View style={{ flex: 1 }}/>
        </Container>
      </KeyboardAvoiding>
    )
  }
}

RegisterScreen.propTypes = {
}

const mapStateToProps = (state) => ({
  user: state.manageUserReducer.user
})

export default connect(
  mapStateToProps,
  {
    ...ManageUserActions
  }
)(RegisterScreen)
