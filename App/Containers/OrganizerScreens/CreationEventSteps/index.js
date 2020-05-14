import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'

import { Creators as ManagerEventActions } from '../../../Stores/reducers/manageEventReducer'

import { Colors } from 'App/Theme'
import api from '../../../Services/api'
import { translate } from '../../../Locales'
import {
    InitialStep
} from '../../../Components'

import { Container } from './styles'
export class CreationEventSteps extends Component {
    constructor(props) {
      super(props)
      this.state = {
        keyboardIsOpen: false,
        loading: false,
        onNextFunc: () => null,
        stepError: false,
        avatarSource: ''
      }
    }

    componentDidMount() {
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

    setSaveNextStepForm = (func) => {
        this.setState({ onNextFunc: func })
    }

    setStepErrors = (errors) => {
        const hasError = Object.entries(errors).length > 0
        this.setState({ stepError: hasError })
    }

    showImagePicker = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { url: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.props.setCover(source)
            }
          });

    }

  render() {
    const activeStep = this.props.navigation.getParam('activeStep', 0)
    const { onNextFunc, stepError, avatarSource } = this.state

    console.log(avatarSource)

    return (
      <Container style={{flex: 1}}>
          <ProgressSteps
            labelColor={Colors.primary}
            disabledStepIconColor={Colors.primary}
            labelFontFamily={'Nunito Regular'}
            progressBarColor={Colors.primary}
            activeStepIconBorderColor={Colors.secondary}
            activeLabelColor={Colors.secondary}
            activeStepNumColor={Colors.secondary}
        >
              <ProgressStep
                onNext={onNextFunc}
                label={translate('firstEditEventStepTitle')}
                errors={stepError}>
                  <InitialStep
                    setSaveNextStepForm={this.setSaveNextStepForm}
                    setStepErrors={this.setStepErrors}
                    setCoverImage={this.showImagePicker}
                />
              </ProgressStep>

              <ProgressStep label="Second Step">
                  <View style={{ alignItems: 'center' }}>
                      <Text>This is the content within step 2!</Text>
                  </View>
              </ProgressStep>
              <ProgressStep label="Third Step">
                  <View style={{ alignItems: 'center' }}>
                      <Text>This is the content within step 3!</Text>
                  </View>
              </ProgressStep>
          </ProgressSteps>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps, {
    ...ManagerEventActions
})(CreationEventSteps)
