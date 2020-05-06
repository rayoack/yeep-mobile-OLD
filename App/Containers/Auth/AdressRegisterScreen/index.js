import React from 'react'
import { Platform, Keyboard, ActivityIndicator, BackHandler, View } from 'react-native'
import { connect } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Creators as ManageUserActions } from '../../../Stores/reducers/manageUserReducer'

import { Images, Colors } from 'App/Theme'
import countriesList from '../../../Services/countries.json'
import { translate } from '../../../Locales'
import * as RNLocalize from "react-native-localize";
import {
  ButtonWithBackground,
  CustomInput,
  CustomPicker
} from '../../../Components'


import {
  Container,
  AdressRegisterTitle,
  TopContainer,
  Logo,
  Footer,
  AskSignInText,
  SignInText,
  KeyboardAvoiding
} from './styles'


class AdressRegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyboardIsOpen: false,
      loading: false,
      countryStates: [],
      adress: '',
      city: '',
      state: '',
      country: ''
    }
  }

  componentDidMount() {
    this.setCountryStates('Argentina')
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

  saveUserAndNavigate = (values) => {
    this.setState({ loading: true })
    const user = { role, ...values }
    
    this.props.setUser(user)

    // this.props.navigation.navigate('AdressAdressRegisterScreen')
  }

  backToRegister = () => {
    return this.props.navigation.navigate('RegisterScreen')
  }

  setCountry = (country) => {
    this.setState({ country })

    this.setCountryStates(country)
  }

  setCountryStates = (countryName) => {
    const actualCountry = countriesList.filter(country => country.name == countryName)
    const countryStates = actualCountry[0].states.map(state => {
      return {
        title: state.name,
        value: state.name
      }
    })

    this.setState({ countryStates })
  }

  setCountries = () => {
    const countries = countriesList.map(country => {
      return {
        title: country.name,
        value: country.name
      }
    })

    return countries
  }

  render() {
    const { loading, keyboardIsOpen } = this.state

    const countries = this.setCountries()

    console.log(this.state.country)
    return (
      <KeyboardAvoiding
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Container>
          <TopContainer>
            <AdressRegisterTitle>{translate('adressRegisterScreenTitle')}</AdressRegisterTitle>
          </TopContainer>

          <Formik
            initialValues={{
              adress: this.state.adress,
              city: this.state.city,
              state: this.state.state,
              country: this.state.country
            }}
            onSubmit={values => this.saveUserAndNavigate(values)}
            enableReinitialize={true}
            validationSchema={
              Yup.object().shape({
                adress: Yup
                  .string()
                  .required(translate('adressRequired')),
                city: Yup
                  .string()
                  .required(translate('cityRequired')),
                state: Yup
                  .string()
                  .required(translate('stateRequired')),
                country: Yup
                  .string()
                  .required(translate('countryRequired'))
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
                  value={values.adress}
                  onChangeText={handleChange('adress')}
                  placeholder={translate('yourAdress')}
                  marginBottom={20}
                  error={touched.adress && errors.adress}
                  onBlur={() => setFieldTouched('adress')}
                  errorText={errors.adress}
                />

                <CustomInput
                  value={values.city}
                  onChangeText={handleChange('city')}
                  placeholder={translate('yourCity')}
                  marginBottom={20}
                  error={touched.city && errors.city}
                  onBlur={() => setFieldTouched('city')}
                  errorText={errors.city}
                />

                <CustomPicker
                  actualValue={values.country}
                  values={countries}
                  onValueChange={value => this.setCountry(value)}
                  label={translate('yourCountry')}
                  marginBottom={30}
                  // error={errors.country}
                  // errorText={errors.country}
                />

                <CustomPicker
                  actualValue={values.state}
                  values={this.state.countryStates}
                  onValueChange={handleChange('state')}
                  label={translate('yourState')}
                  marginBottom={30}
                  // error={errors.state}
                  // errorText={errors.state}
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
                />
              </>
            )}
          </Formik>

          {!keyboardIsOpen ?
            <Footer
              onPress={() => this.backToRegister()}
              activeOpacity={0.7}
            >
              <AskSignInText>{translate('backToRegister')}</AskSignInText>
              {/* <SignInText>{translate('signupHere')}</SignInText> */}
            </Footer>
          : null}
          <View style={{ flex: 1 }}/>
        </Container>
      </KeyboardAvoiding>
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.manageUserReducer.user
})

export default connect(
  mapStateToProps,
  {
    ...ManageUserActions
  }
)(AdressRegisterScreen)
