import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import ImagePker from 'react-native-image-crop-picker';
import { connect } from 'react-redux'
import _ from 'lodash'

import { format, parseISO, isBefore, isAfter, parse } from 'date-fns';
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import setSeconds from 'date-fns/setSeconds'
import setDate from 'date-fns/setDate'
import setMonth from 'date-fns/setMonth'
import setYear from 'date-fns/setYear'
import getTime from 'date-fns/getTime'
import addDays from 'date-fns/addDays'
import addHours from 'date-fns/addHours'
import formatISO from 'date-fns/formatISO'
import isSameDay from 'date-fns/isSameDay'

import { Creators as ManagerEventActions } from '../../../Stores/reducers/manageEventReducer'

import { Colors } from 'App/Theme'
import { ProgressSteps, ProgressStep } from '../../../Services/ProgressSteps';
import api from '../../../Services/api'
import { translate } from '../../../Locales'
import {
  SavingLoading,
  HeaderWithBackButton,
  InitialStep,
  AddImagesToEvent,
  EventDescription,
  EventDates,
  CustomToast,
} from '../../../Components'

import { Container } from './styles'
import { date } from 'yup';
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
      toastText: '',
      showToast: false,
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

  setShowToast = (text) => {
    this.setState({ toastText: text, showToast: true })

    this.interval = setInterval(() => {
      this.setState({ showToast: false })
      clearInterval(this.interval)
    }, 3000);
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

  // SAVE EVENT CHANGES
  saveOrUpdateEvent = async (step) => {
    const { event } = this.props
    this.setState({ loading: true })

    let isLocalImageUri = uri =>  !uri.includes('http')
    let oldStep = event.register_step;

    try {
      let updateEvent

      if(event.id) {
        let formData = { ...event }
        formData.register_step = formData.register_step < step ?
          step
          : formData.register_step

        // if(formData.dates.length &&
        //   formData.register_step < 3 &&
        //   !formData.register_step > 3) formData.register_step = 3;

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

      console.log('event', event)

      if(step == 0 &&
        event.event_logo &&
        event.event_logo !== undefined &&
        Object.keys(event.event_logo).length &&
        event.event_logo.url &&
        isLocalImageUri(event.event_logo.url)) {
        this.uploadCover(event.event_logo.url, updateEvent.id)
      }

      if(step == 1 && event.event_images.length) {
        this.deleteImagesAfterSave()
        this.uploadImage(updateEvent.id)
      }

      this.setState({ loading: false })

      this.goToNextStep()

      if(step === 3) {
        // ALTERAR Se for a primeira vez levar para a tela de sucesso
        if(oldStep < step) return

        this.props.navigation.goBack()
      } 

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

  // EVENT DATES
  insertNewDate = () => {
    const { dates } = this.props.event

    let datesCopy = dates ? dates.map(date => date) : []

    if(datesCopy.length) {
      let newDate = {...datesCopy[datesCopy.length - 1]}
      let newFullDate = formatISO(addDays(parseISO(newDate.full_date), 1))
      let newDay = format(parseISO(newFullDate), 'yyyy-MM-dd')

      newDate = {
        ...newDate,
        day: newDay,
        full_date: newFullDate
      }
      
      datesCopy = [...datesCopy, newDate]

    } else {
      
      let firstNewFullDate = formatISO(new Date())
      let firstNewDay = format(parseISO(firstNewFullDate), 'yyyy-MM-dd')
      let firstStartHour = format(parseISO(firstNewFullDate), 'HH:mm')

      let endDay = addHours(parseISO(firstNewFullDate), 1)

      if(isSameDay(endDay, parseISO(firstNewFullDate))) {
        let firstEndHour = format(addHours(parseISO(firstNewFullDate), 1), 'HH:mm')
        
        const newDate = {
          full_date: firstNewFullDate,
          day: firstNewDay,
          start_hour: firstStartHour,
          end_hour: firstEndHour,
        }

        datesCopy = [ newDate ]
      } else {

        const firstNewDate = {
          full_date: firstNewFullDate,
          day: firstNewDay,
          start_hour: firstStartHour,
          end_hour: firstStartHour,
        }

        const secondNewDate = {
          start_hour: format(parseISO(formatISO(endDay)), 'HH:mm'),
          end_hour: addHours(parseISO(formatISO(endDay)), 1),
          day: format(parseISO(formatISO(endDay)), 'yyyy-MM-dd'),
          full_date: formatISO(endDay)
        }

        datesCopy = [ firstNewDate, secondNewDate ]
      }
      
    }

    this.props.setEventDates(datesCopy)
  }

  removeDate = (indexToRemove) => {
    const { dates } = this.props.event

    let datesCopy = dates.filter((date, index) => index != indexToRemove)

    this.props.setEventDates(datesCopy)
  }

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
        const [year, month, day] = selectedDay.dateString.split('-')
        const newFullDate = formatISO(setDate(setMonth(setYear(parseISO(date.full_date), year), month - 1), day))
        date.full_date = newFullDate
        date.day = selectedDay.dateString
      }

      return date
    })
  
    const orderDates = _.orderBy(eventDates, ['day'], ['asc'])
    this.props.setEventDates(orderDates)
    this.props.navigation.navigate('CreationEventSteps')
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

  startHourAvailable = (startTime, day, endHourTime) => {

    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endHourTime.split(':');

    const fullStart = setSeconds(setMinutes(setHours(day, startHour), startMinute), 0)
    const fullEnd = setSeconds(setMinutes(setHours(day, endHour), endMinute), 0)
    const available = isBefore(fullStart, fullEnd)
    
    return available
  }

  endHourAvailable = (endTime, day, startHourTime) => {

    const [endHour, endMinute] = endTime.split(':');
    const [startHour, startMinute] = startHourTime.split(':');

    const fullStart = setSeconds(setMinutes(setHours(day, startHour), startMinute), 0)
    const fullEnd = setSeconds(setMinutes(setHours(day, endHour), endMinute), 0)
    const available = isAfter(fullEnd, fullStart)
    
    return available
  }

  setDayTime = (time) => {
    const { dates } = this.props.event
    const { selectedDayIndex, hourType } = this.state

    const selectedHour = format(getTime(time), 'HH:mm')

    let eventDates = [ ...dates ]

    eventDates.map((date, index) => {
      if(index == selectedDayIndex) {

        if(hourType == 'start_hour') {
          const available = this.startHourAvailable(
            selectedHour,
            parseISO(date.day),
            date.end_hour)

            // TOAST
            if(!available) return this.setShowToast(translate('startHourError'))

            const [startHour, startMinute] = selectedHour.split(':')
            date.full_date = formatISO(setSeconds(setMinutes(setHours(parseISO(date.full_date), startHour), startMinute), 0))

        } else {
          const available = this.endHourAvailable(
            selectedHour,
            parseISO(date.day),
            date.start_hour)

            // TOAST
            if(!available) return this.setShowToast(translate('endHourError'))
        }

        date[hourType] = selectedHour
      }

      return date
    })

    this.props.setEventDates(eventDates)
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
      isTimePickerVisible,
      toastText,
      showToast } = this.state

    const { event } = this.props

    return (
      <>
        <SavingLoading loading={loading} />

        <CustomToast
          show={showToast} 
          text={toastText} 
          duration={2000}
          positionValue={50}
        />

        <Container style={{flex: 1}}>
          <HeaderWithBackButton navigation={this.props.navigation}/>

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
                  saveOrUpdateEvent={this.saveOrUpdateEvent}
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

              {/* STEP 3: EVENT DESCRIPTION */}
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
                    saveOrUpdateEvent={this.saveOrUpdateEvent}
                  />
              </ProgressStep>

              {/* STEP 4: EVENT DATES */}
              <ProgressStep
                nextBtnStyle={this.nextButtonStyle}
                nextBtnTextStyle={this.nextButtonTextStyle}
                previousBtnStyle={this.nextButtonStyle}
                previousBtnTextStyle={this.nextButtonTextStyle}
                onPrevious={this.goBackStep}
                onSubmit={event.dates ? () => this.saveOrUpdateEvent(3) : () => this.setShowToast(translate('dateRequired'))}
                label={translate('fourthEditEventStepTitle')}>
                  <EventDates
                    navigateToCalendar={this.navigateToCalendar}
                    openTimePicker={this.openTimePicker}
                    closeTimePicker={this.closeTimePicker}
                    setDayTime={this.setDayTime}
                    isTimePickerVisible={isTimePickerVisible}
                    insertNewDate={this.insertNewDate}
                    removeDate={this.removeDate}
                  />
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
