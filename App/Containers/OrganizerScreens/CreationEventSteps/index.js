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
    InitialStep,
    SavingLoading
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
      avatarSource: '',
      activeStep: 0,
    }
  }

  componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

      const activeStep = this.props.navigation.getParam('activeStep', 0)
      this.setState({ activeStep })
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

  setFirstStepFormdata = (newData) => {
    this.props.setFirstStep(newData)

    this.saveOrUpdateEvent(0)
  }

  // SAVE EVENT CHANGES
  saveOrUpdateEvent = async (step) => {
    const { event } = this.props
    this.setState({ loading: true })

    let isLocalImageUri = uri => !uri.includes('http')

    try {
      let updateEvent

      if(event.id) {
        let formData = { ...event }
        formData.register_step = formData.register_step < step ?
          step
          : formData.register_step

        const { data } = await api.put(`/events/${event.id}`, formData, {
          authorization: `Bearer ${this.props.user.token}`
        })
        
        updateEvent = data

      } else {
        const { data } = await api.post('/events', event, {
          authorization: `Bearer ${this.props.user.token}`
        })

        updateEvent = data
      }
      
      if(step == 0 &&
        event.event_logo &&
        isLocalImageUri(event.event_logo.url)
      ) {
        this.uploadCover(event.event_logo.url, updateEvent.id)
      }

      this.props.setEventFormData(updateEvent)
      this.setState({ loading: false })

      this.goToNextStep()

    } catch (error) {
      console.log({error})
      this.setState({ loading: false, stepError: true })
    }
  }

  uploadCover = async (imageUri, id) => {
    let headers = {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      authorization: `Bearer ${this.props.user.token}`
    }

    let formData = new FormData()

    formData.append('file', {
      uri: imageUri,
      name: imageUri,
      type: 'image/jpg',
    })

    try {
      const { data } = await api.post(`/events/${id}/logo`, formData, headers)

      const event_logo = {
        id: data.id,
        name: data.name,
        url: data.url,
      }
      
      this.props.setCover(event_logo)
    } catch (error) {
      console.log({error})
      this.setState({ loading: false, stepError: true })

    }
  }

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

  //     const { data } = await api.post(`/images/${id}/events`, formData, headers)

  //   } catch (error) {
  //     console.log({error})
      // this.setState({ loading: false })

  //   }
  // }

  deleteCover = () => {
    this.props.setCover(null)
    this.props.setCoverId(null)
  }

  goToNextStep = () => {
    this.setState(prevState => ({ activeStep: prevState.activeStep + 1 }))
  }

  goBackStep = () => {
    this.setState(prevState => ({ activeStep: prevState.activeStep - 1 }))
  }

  nextButtonStyle = {
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  };

  nextButtonTextStyle = {
    color: Colors.white,
    fontFamily: 'Nunito Bold'
  };

  render() {
    const { onNextFunc, stepError, avatarSource, loading, activeStep } = this.state

    return (
      <>
        <SavingLoading loading={loading} />

        <Container style={{flex: 1}}>
            <ProgressSteps
              activeStep={activeStep}
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
                  onPrevious={this.goBackStep}
                  label={translate('firstEditEventStepTitle')}
                  errors={stepError}
                  nextBtnText={translate('nextBtnText')}
                  nextBtnStyle={this.nextButtonStyle}
                  nextBtnTextStyle={this.nextButtonTextStyle}
                >
                    <InitialStep
                      setSaveNextStepForm={this.setSaveNextStepForm}
                      setStepErrors={this.setStepErrors}
                      setCoverImage={this.showImagePicker}
                      setFirstStepFormdata={this.setFirstStepFormdata}
                      deleteCover={this.deleteCover}
                  />
                </ProgressStep>

                <ProgressStep
                  label="Second Step"
                  nextBtnStyle={this.nextButtonStyle}
                  nextBtnTextStyle={this.nextButtonTextStyle}
                  previousBtnStyle={this.nextButtonStyle}
                  previousBtnTextStyle={this.nextButtonTextStyle}
                  onPrevious={this.goBackStep}
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
      </>
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
