import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { ProgressSteps, ProgressStep } from '../../../Services/ProgressSteps';
import ImagePicker from 'react-native-image-picker';
import ImagePker from 'react-native-image-crop-picker';
import { connect } from 'react-redux'
import _ from 'lodash'
import { parseISO, isBefore, isAfter } from 'date-fns';
import getHours from 'date-fns/getHours'
import getMinutes from 'date-fns/getMinutes'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import setSeconds from 'date-fns/setSeconds'

import { Creators as ManagerEventActions } from '../../../Stores/reducers/manageEventReducer'

import { Colors } from 'App/Theme'
import api from '../../../Services/api'
import { translate } from '../../../Locales'
import {
  SavingLoading,
  InitialStep,
  AddImagesToEvent,
  EventDescription,
  EventDates,
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
      activeStep: 0,
      activeImageIndex: 0,
      isCarrouselOpen: false,
      isCarrouselOpen: false,
      imagesToDelete: [],
      selectedDayIndex: 0,
      isTimePickerVisible: false,
      hourType: 'start_hour',
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

  // OPEN CAMERA AND GALLERY
  showImagePicker = (title, type) => {
    const { event } = this.props

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
        enableRotationGesture: true,
        mediaType: 'photo',
        multiple: true
      }).then(images => {
        const newImages = images.map(image => {
          return {
            name: image.modificationDate,
            url: image.path
          }
        })

        const eventImages = [ ...event.event_images, ...newImages ]

        console.log(images);
        this.props.setImages(eventImages)
      }); 
    }
  }

  // SAVE FIRST STEP
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
        this.props.setEventId(data.id)
      }

      if(step == 0 &&
        event.event_logo &&
        isLocalImageUri(event.event_logo.url)) {
        this.uploadCover(event.event_logo.url, updateEvent.id)
      }

      if(step == 1) {
        this.deleteImagesAfterSave()
        this.uploadImage(updateEvent.id)
      }

      this.setState({ loading: false })

      this.goToNextStep()

    } catch (error) {
      console.log({error})
      this.setState({ loading: false, stepError: true })
    }
  }

  // COVER
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

  deleteCover = () => {
    this.props.setCover(null)
    this.props.setCoverId(null)
  }

  // IMAGES
  uploadImage = (id) => {
    const { event } = this.props

    let localImages = event.event_images.filter((image, index) => !image.url.includes('http'))
    let eventImages = event.event_images.filter((image, index) => image.url.includes('http'))
    let headers = {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      authorization: `Bearer ${this.props.user.token}`
    }

    if(localImages) {
      localImages.map(async image => {
        try {
          let formData = new FormData()

          formData.append('file', {
            uri: image.url,
            name: image.url,
            type: 'image/jpg',
          })

          const { data } = await api.post(`/images/${id}/events`, formData, headers)
          
          const event_image = {
            id: data.id,
            name: data.name,
            url: data.url,
          }

          eventImages.push(event_image)

        } catch (error) {
          console.log({error})
          this.setState({ loading: false, stepError: true })
    
        }
      })

      return this.props.setImages(eventImages)
    }
  }

  deleteImagesAfterSave = () => {
    const { imagesToDelete } = this.state
    let externalImages = imagesToDelete.filter((image, index) => image.url.includes('http'))
    
    if(externalImages.length) {

      try {  
        externalImages.map(async image => {
          const { data } = await api.delete(`/images/${image.id}`, null, {
            authorization: `Bearer ${this.props.user.token}`
          })
        })

      } catch (error) {
        console.log({error})
        this.setState({ loading: false })

      }
    } else {
      return
    }
  }

  deleteImage = (indexToDelete) => {
    const { event } = this.props
    const imagesToDelete = event.event_images.filter((image, index) => index == indexToDelete)
    const images = event.event_images.filter((image, index) => index != indexToDelete)

    this.setState({ imagesToDelete })
    this.props.setImages(images)
  }

  showCarrousel = () => {
    this.setState({isCarrouselOpen: !this.state.isCarrouselOpen})
  }

  onSnapToImage = (index) => {
    this.setState({ activeImageIndex: index, isCarrouselOpen: true })
  }

  // EVENT DESCRIPTION
  setDescription = (values) => {
    this.props.setDescription(values.description)
    this.saveOrUpdateEvent(2)
  }

  // EVENT DATES
  navigateToCalendar = (index) => {
    const { dates } = this.props.event
    this.setState({ selectedDayIndex: index })

    let markedDates = {}

    if(dates && dates.length) {
      let eventDates = dates.map(date => {
        markedDates[date.day] = {selected: true}
      })
    }

    this.props.navigation.push('Calendar', {
      markedDates,
      onDayPress: this.setEventDay
    })
  }

  setEventDay = (selectedDay) => {
    const { dates } = this.props.event
    const { selectedDayIndex } = this.state
    let eventDates = [ ...dates ]

    eventDates.map((date, index) => {
      if(index == selectedDayIndex) {
        date.day = selectedDay.dateString
      }

      return date
    })
  
    const orderDates = _.orderBy(eventDates, ['day'], ['asc'])
    this.props.setEventDates(orderDates)
    this.props.navigation.goBack(null)
  }

  openTimePicker = (index, hourType) => {
    this.setState({
      isTimePickerVisible: true,
      selectedDayIndex: index,
      hourType
    })
  }

  closeTimePicker = () => {
    this.setState({ isTimePickerVisible: false })
  }

  startHourAvailable = (startTimestamp, day, endHourTime) => {
    const time = `${getHours(startTimestamp)}:${getMinutes(startTimestamp)}`

    const [startHour, startMinute] = time.split(':');
    const [endHour, endMinute] = endHourTime.split(':');

    const fullStart = setSeconds(setMinutes(setHours(day, startHour), startMinute), 0)
    const fullEnd = setSeconds(setMinutes(setHours(day, endHour), endMinute), 0)
    const available = isAfter(fullStart, fullEnd)
    
    console.log('-----')
    console.log('fullStart', fullStart)
    console.log('fullEnd', fullEnd)
    console.log('available', available)
    // return {
    //   time,
    //   value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
    // };
  }


  setDayTime = (time) => {
    const { dates } = this.props.event
    const { selectedDayIndex, hourType } = this.state

    let eventDates = [ ...dates ]

    eventDates.map((date, index) => {
      if(index == selectedDayIndex) {

        if(hourType == 'start_hour') {
          this.startHourAvailable(time, parseISO(date.day), date.end_hour)
        }
        // date[hourType] = hour
      }

      return date
    })

    this.setState({ isTimePickerVisible: false })
  }

  // STEPS FUNCTIONS
  goToNextStep = () => {
    this.setState(prevState => ({ activeStep: prevState.activeStep + 1 }))
  }

  goBackStep = () => {
    this.setState(prevState => ({ activeStep: prevState.activeStep - 1 }))
  }

  setSaveNextStepForm = (func) => {
    this.setState({ onNextFunc: func })
  }

  setStepErrors = (errors) => {
      const hasError = Object.entries(errors).length > 0
      this.setState({ stepError: hasError })
  }

  nextButtonStyle = {
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }

  nextButtonTextStyle = {
    color: Colors.white,
    fontSize: 15,
    fontFamily: 'Nunito Regular'
  }

  render() {
    const {
      onNextFunc,
      stepError,
      loading,
      activeStep,
      activeImageIndex,
      isCarrouselOpen,
      isTimePickerVisible } = this.state

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
              {/* STEP 1: INITIAL SETTINGS */}
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

              {/* STEP 2: ADD PHOTOS */}
              <ProgressStep
                label={translate('secondEditEventStepTitle')}
                nextBtnStyle={this.nextButtonStyle}
                nextBtnTextStyle={this.nextButtonTextStyle}
                previousBtnStyle={this.nextButtonStyle}
                previousBtnTextStyle={this.nextButtonTextStyle}
                onPrevious={this.goBackStep}
                onNext={() => this.saveOrUpdateEvent(1)}
              >
                <AddImagesToEvent
                  activeImageIndex={activeImageIndex}
                  isCarrouselOpen={isCarrouselOpen}
                  showCarrousel={this.showCarrousel}
                  onSnapToImage={this.onSnapToImage}
                  deleteImage={this.deleteImage}
                  showImagePicker={this.showImagePicker}
                />
              </ProgressStep>

              {/* EVENT DESCRIPTION */}
              <ProgressStep
                label={translate('thirdEditEventStepTitle')}
                nextBtnStyle={this.nextButtonStyle}
                nextBtnTextStyle={this.nextButtonTextStyle}
                previousBtnStyle={this.nextButtonStyle}
                previousBtnTextStyle={this.nextButtonTextStyle}
                onPrevious={this.goBackStep}
                onNext={onNextFunc}>
                  <EventDescription
                    setSaveNextStepForm={this.setSaveNextStepForm}
                    setDescription={this.setDescription}
                  />
              </ProgressStep>

              {/* EVENT DATES */}
              <ProgressStep label="Third Step">
                  <EventDates
                    navigateToCalendar={this.navigateToCalendar}
                    openTimePicker={this.openTimePicker}
                    closeTimePicker={this.closeTimePicker}
                    setDayTime={this.setDayTime}
                    isTimePickerVisible={isTimePickerVisible}
                  />
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
