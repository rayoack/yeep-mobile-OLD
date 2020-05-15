import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { ProgressSteps, ProgressStep } from '../../../Services/ProgressSteps';
import ImagePicker from 'react-native-image-picker';
import ImagePker from 'react-native-image-crop-picker';
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

  showImagePicker = (title, type) => {
    const options = {
        title: translate(title),
        takePhotoButtonTitle: translate('takePhotoTitle'),
        chooseFromLibraryButtonTitle: translate('chooseFromLibraryTitle'),
        mediaType: 'photo',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    if (type == 'single') {
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
    
    } else {
      ImagePker.openPicker({
        multiple: true
      }).then(images => {
        const imagesPath = images.map(image => image.path)

        console.log(imagesPath);
        // this.props.setImages(imagesPath)
      }); 
    }
  }

  // uploadCover = (imageUri, id) => {

  //   let headers = {
  //     'Content-Type': 'multipart/form-data',
  //     'Access-Control-Allow-Origin': '*'
  //   }

  //   let formData = new FormData()

  //   formData.append('file', {
  //     uri: imageUri,
  //     name: imageUri,
  //     type: 'image/jpg',
  //   })

  //   try {
  //     const { data } = await API.post(`/events/${id}/logo`, formData, headers)
      
  //   } catch (error) {
  //     console.log({error})
  //   }
  // }

  // uploadImage = (imagesUris, id) => {
  //   const { event } = this.props

  //   let headers = {
  //     'Content-Type': 'multipart/form-data',
  //     'Access-Control-Allow-Origin': '*'
  //   }

  //   try {
          
  //     let formData = new FormData()

  //     formData.append('file', {
  //       uri: imageUri,
  //       name: imageUri,
  //       type: 'image/jpg',
  //     })

  //     const { data } = await API.post(`/images/${id}/events`, formData, headers)

  //   } catch (error) {
  //     console.log({error})
  //   }
  // }

  // saveOrUpdateEvent = (newData) => {
  //   const { event } = this.props

  //   try {
  //     let updateEvent

  //     if(event.id) {
  //       const { data } = await API.put(`/events/${event.id}`, event, {
  //         authorization: `Bearer ${this.props.user.token}`
  //       })
        
  //     } else {
  //       const { data } = await API.post('/events', newData, {
  //         authorization: `Bearer ${this.props.user.token}`
  //       })

  //     }

  //     isLocalImageUri = uri => !uri.includes('http')

  //   } catch (error) {
  //     console.log({error})
  //   }
  // }

  nextButtonStyle = {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  };

  nextButtonTextStyle = {
    color: Colors.white,
    fontFamily: 'Nunito Bold'
  };

  render() {
    const activeStep = this.props.navigation.getParam('activeStep', 0)
    const { onNextFunc, stepError, avatarSource } = this.state

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
            completedStepIconColor={Colors.secondary}
            completedProgressBarColor={Colors.secondary}
        >
              <ProgressStep
                onNext={onNextFunc}
                label={translate('firstEditEventStepTitle')}
                errors={stepError}
                nextBtnStyle={this.nextButtonStyle}
                nextBtnTextStyle={this.nextButtonTextStyle}
              >
                  <InitialStep
                    setSaveNextStepForm={this.setSaveNextStepForm}
                    setStepErrors={this.setStepErrors}
                    setCoverImage={this.showImagePicker}
                />
              </ProgressStep>

              <ProgressStep
                label="Second Step"
                nextBtnStyle={this.nextButtonStyle}
                nextBtnTextStyle={this.nextButtonTextStyle}
                previousBtnStyle={this.nextButtonStyle}
                previousBtnTextStyle={this.nextButtonTextStyle}
              >
                  <View style={{ alignItems: 'center' }}>
                      <Text>This is the content within step 2!</Text>
                  </View>
              </ProgressStep>

              <ProgressStep label="Third Step">
                  <View style={{ alignItems: 'center' }}>
                      <Text>This is the content within step 3!</Text>
                  </View>
              </ProgressStep>

              <ProgressStep label="Third Step">
                  <View style={{ alignItems: 'center' }}>
                      <Text>This is the content within step 3!</Text>
                  </View>
              </ProgressStep>

              <ProgressStep label="Third Step">
                  <View style={{ alignItems: 'center' }}>
                      <Text>This is the content within step 3!</Text>
                  </View>
              </ProgressStep>

              <ProgressStep label="Third Step">
                  <View style={{ alignItems: 'center' }}>
                      <Text>This is the content within step 3!</Text>
                  </View>
              </ProgressStep>

              <ProgressStep label="Third Step">
                  <View style={{ alignItems: 'center' }}>
                      <Text>This is the content within step 3!</Text>
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
  event: state.manageEventReducer.event,
  user: state.auth.user
})

export default connect(mapStateToProps, {
    ...ManagerEventActions
})(CreationEventSteps)
