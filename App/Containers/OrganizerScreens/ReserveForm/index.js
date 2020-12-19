import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux'
import differenceInHours from 'date-fns/differenceInHours'


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

import { Creators as ManagerReserveActions } from '../../../Stores/reducers/manageReserveReducer'
import { translate, toNumber } from '../../../Locales'
import currencies from '../../../Services/currencies.json'
import { Images, Colors } from '../../../Theme'
import { normalizedDates } from '../../../Services/datesHelpers'
import api from '../../../Services/api'
import { navigateToCalendar, setDayTime } from '../../../Services/datesHelpers'

import {
  CustomInput,
  InputButton,
  CustomToast,
  SavingLoading,
  AnimationLoading,
  ButtonWithBackground
} from '../../../Components'

import {
  Container,
  Divider,
  StyledView,
  StyledText,
  StyledImage,
  StyledTextInput,
  PlaceDetailsContainer,
  PlaceInfosContainer,
  DateContainer,
  HoursContainer,
  InsertDateButtonText,
  InsertDayContainer,
  InsertDateButton,
  DeleteDateContainer,
  DeleteDateIcon,
  StyledCollapsibleList,
  ViewMoreButton,
  PriceInfoContainer,
  ReserveHeader,
  CloseButtonContainer,
  StyledIcon,
  FooterContainer,
  CheckButton
} from './styles'

export class ReserveForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      service_charge: '',
      datesListText: translate('showMore'),
      restrictionsButtonText: translate('showLess'),
      saveLoading: false,
      isEditing: false,
      hostId: null
    }
  }

  componentDidMount = () => {
    const reserveId = this.props.navigation.getParam('reserveId', false)
    
    if(!reserveId) {
      // this.setMessage(translate('reserveSpacesMessage'))
      this.setNewReserve()
    } else {
      this.loadActualReserve()
    }

  }

  loadActualReserve = async () => {
    this.setState({ loading: true })
    const reserveId = this.props.navigation.getParam('reserveId', false)
    
    try {
      const { data } = await api.get(`/reserve/${reserveId}`, {}, {
        authorization: `Bearer ${this.props.user.token}`
      })

      this.setState(prevState => {
        return {
          reserve: data,
          isEditing: true,
          space: data.Space,
          event: data.Event,
          loading: false,
          hostId: data.Space.owner_id
        }
      }, () => data.Space.charge_type == 'perDay' ?
        this.setAmountPerDay()
        : this.setAmountPerHour())

    } catch (error) {
      console.log('error', {error})
      this.setState({
        loading: false,
      })
      
      store.dispatch(ManagerReserveActions.setToastText(translate('loadReserveError')))
      store.dispatch(ManagerReserveActions.setShowToast(true))

      this.interval = setInterval(() => {
        store.dispatch(ManagerReserveActions.setToastText(translate('')))
        store.dispatch(ManagerReserveActions.setShowToast(false))

        clearInterval(this.interval)
        this.props.navigation.goBack()
      }, 2000);
    }

  }

  setNewReserve = () => {
    const { reserve, eventOfReserve, spaceOfReserve } = this.props

    const reserveWithFormatedDates = normalizedDates(reserve)

    this.props.setReserveDates(reserveWithFormatedDates)

    spaceOfReserve.charge_type === 'perDay' ?
      this.setAmountPerDay()
      : this.setAmountPerHour()

    // let newReserve

    // if(eventOfReserve) {
    //   newReserve = {
    //     // start_date: event.dates[0].full_date,
    //     dates: event.dates,
    //     // end_date: this.setEndDate(
    //     //   parseISO(event.dates[event.dates.length - 1].day),
    //     //   event.dates[event.dates.length - 1].end_hour),
    //     amount: 0,
    //     quantity: 0,
    //     space_id: space.id,
    //     event_id: event.id,
    //     status: "waitingForApproval",
    //   }

    // } else {
    //   newReserve = {
    //     dates: selectDates,
    //     amount: 0,
    //     quantity: 0,
    //     space_id: space.id,
    //     event_id: event.id,
    //     status: "waitingForApproval",
    //   }
    // }

    // this.setState(prevState => {
    //   return {
    //     reserve: newReserve,
    //     space,
    //     event
    //   }
    // }, () => space.charge_type == 'perDay' ?
    //   this.setAmountPerDay()
    //   : this.setAmountPerHour())
  }

  calculateTotalHours = (startTime, day, endHourTime) => {

    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endHourTime.split(':');

    const fullStart = setSeconds(setMinutes(setHours(day, startHour), startMinute), 0)
    const fullEnd = setSeconds(setMinutes(setHours(day, endHour), endMinute), 0)
    const totalHours = differenceInHours(fullEnd, fullStart)
    
    return totalHours
  }

  setEndDate = (day, endHourTime) => {
    const [endHour, endMinute] = endHourTime.split(':');
    const fullEnd = setSeconds(setMinutes(setHours(day, endHour), endMinute), 0)
    
    return formatISO(fullEnd)
  }

  setAmountPerDay = () => {
    const { reserve, spaceOfReserve } = this.props

    if(reserve && spaceOfReserve) {
      let reserveCopy = { ...reserve }
  
      reserveCopy.quantity = reserve.dates.length
      reserveCopy.amount = reserve.dates.length * spaceOfReserve.price

      this.props.setReserveFormData(reserveCopy)
    }

  }

  setAmountPerHour = () => {
    const { reserve, eventOfReserve, spaceOfReserve } = this.props

    if(reserve && spaceOfReserve) {
      let reserveCopy = { ...reserve }
      let quantityTotal = 0

      reserve.dates.map(date => {
        const totalDateHours = this.calculateTotalHours(
          date.start_hour,
          parseISO(date.day),
          date.end_hour)

        quantityTotal = quantityTotal + totalDateHours
      })
  
      reserveCopy.quantity = quantityTotal
      reserveCopy.amount = quantityTotal * spaceOfReserve.price

      this.props.setReserveFormData(reserveCopy)
    }

  }

  cancelReservation = () => {
    return this.props.navigation.goBack()
  }

  getCurrencySymbol = (actualCurrency) => {
    const symbol = currencies.filter(currency => {
      if(currency.value == actualCurrency) {
        return currency
      }
    })
    
    return symbol[0].symbol
  }

  setMessage = (message) => this.props.setReserveMessage(message)

  setDatesListText = (text) => this.setState({ datesListText: text })

  saveReserve = async () => {
    const { reserve, eventOfReserve, spaceOfReserve } = this.props

    this.setState({ saveLoading: true })

    try {
      
      const { data } = await api.post('/reserve', { ...reserve }, {
        authorization: `Bearer ${this.props.user.token}`
      })
      
      let room = {
        id: data.id,
        name: spaceOfReserve && spaceOfReserve.name ? spaceOfReserve.name : '',
        title: spaceOfReserve && spaceOfReserve.name ? spaceOfReserve.name : '',
        last_message_target_id: data.last_message_target_id,
        read: data.last_message_target_id == this.props.user.id ?
          data.last_message_target_read
          : true,
        image: spaceOfReserve.Images.length ? spaceOfReserve.Images[0].url : Images.image_background,
        status: data.status,
        updatedAt: data.updatedAt
      }

      this.setState({saveLoading: false })
      this.props.navigation.navigate('RoomChat', {
        room,
        newReserve: true
      })

    } catch (error) {
      console.log('error', {error})
      this.setState({saveLoading: false })
      this.setShowToast(translate('saveReserveError'))
    }
  }

  setShowToast = (text) => {
    store.dispatch(ManagerReserveActions.setToastText(text))
    store.dispatch(ManagerReserveActions.setShowToast(true))

    this.interval = setInterval(() => {
      store.dispatch(ManagerReserveActions.setToastText(translate('')))
      store.dispatch(ManagerReserveActions.setShowToast(false))
      clearInterval(this.interval)
    }, 2000);
  }

  confirmFunction = () => {
    const { isEditing, hostId } = this.state
    const { user } = this.props

    if(!isEditing) {
      return this.saveReserve()
    }

    if(isEditing && hostId == user.id) {
      // continue herre
    }
  }

  insertNewDate = async () => {
    const { dates } = this.props.reserve
    
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

    const reserveWithFormatedDates = normalizedDates({ dates: datesCopy })
    await this.props.setReserveDates(reserveWithFormatedDates.dates)

    this.props.spaceOfReserve.charge_type === 'perDay' ?
      this.setAmountPerDay()
      : this.setAmountPerHour()
  }

  openTimePicker = (index, hourType) => {
    this.props.setHourType(hourType)
    this.props.setSelectedDayIndex(index)
    this.props.setTimePickerVisible(true)
  }

  closeTimePicker = () => {
    this.props.setTimePickerVisible(false)
  }

  render() {
    const {
      datesListText,
      loading,
      saveLoading,
      isEditing,
      hostId
    } = this.state
    
    
    const { reserve, eventOfReserve, spaceOfReserve, isTimePickerVisible, showToast, toastText } = this.props
    console.log({showToast})

    return (
      <>
        {loading && <AnimationLoading loading={loading}/>}
        <SavingLoading loading={saveLoading} />

        <CustomToast
          show={showToast} 
          text={toastText} 
          duration={2000}
          positionValue={50}
        />

        {reserve && !loading && !saveLoading ? (
          <>
            <Container>
              <ReserveHeader>
                <CloseButtonContainer onPress={() => this.cancelReservation()}>
                  <StyledIcon color={Colors.white} size={30} name={'ios-close'}/>
                </CloseButtonContainer>

              </ReserveHeader>

              {/* SPACE DETAILS */}
              <PlaceDetailsContainer>
                {/* SPACE NAME */}
                {/* <StyledView> */}
                  <StyledText
                    fontSize={'30px'}
                    fontFamily={'Nunito Bold'}
                    fontColor={Colors.labelBlack}
                  >
                    {spaceOfReserve.name}
                  </StyledText>
                {/* </StyledView> */}

                {/* SPACE INFOS CONTAINER */}
                <PlaceInfosContainer>
                  {/* SPACE LEFT INFOS */}
                  <View style={{ flex: 1 }} >
                    <StyledView>
                      <StyledText
                        fontSize={'15px'}
                        fontFamily={'Nunito Semi Bold'}
                        fontColor={Colors.labelBlack}
                      >
                        {translate(spaceOfReserve.category)}
                      </StyledText>

                      <StyledText
                        numberOfLines={2}
                      >
                        {`${this.getCurrencySymbol(spaceOfReserve.monetary_unit)}${toNumber(spaceOfReserve.price)} / ${translate(spaceOfReserve.charge_type)}`}
                      </StyledText>
                    </StyledView>

                    <StyledText>{spaceOfReserve.description}</StyledText>
                  </View>

                  {/* SPACE IMAGE */}
                  <View style={{ flex: 1, alignItems: 'flex-end' }} >
                    {spaceOfReserve.Images.length ? (
                      <StyledImage
                        borderRadius={10}
                        source={{ uri: spaceOfReserve.Images[0].url }}
                      />
                    ) : (
                      <StyledImage
                        borderRadius={10}
                        source={Images.image_background}
                      />
                    )}
                  </View>

                </PlaceInfosContainer>
              </PlaceDetailsContainer>
              <Divider marginBottom={'15px'}/>
              {/* SPACE DETAILS */}

              {/* EVENT DATES */}
              <StyledText
                fontSize={'20px'}
                fontFamily={'Nunito Bold'}
                fontColor={Colors.labelBlack}
              >
                {translate('eventDatesLabel')}
              </StyledText>


              {/* <StyledCollapsibleList
                numberOfVisibleItems={1}
                onToggle={collapsed =>
                  collapsed
                    ? this.setDatesListText(translate('showLess'))
                    : this.setDatesListText(translate('showMore'))
                }
                buttonContent={
                  <>
                    {reserve && reserve.dates.length > 1 ? (
                      <ViewMoreButton>
                        <StyledText
                          fontColor={Colors.secondary}
                          fontFamily={'Nunito Bold'}
                          fontSize={'15px'}
                        >
                          {datesListText}
                        </StyledText>
                      </ViewMoreButton>
                    ) : null}
                  </>
                }
              > */}
                {reserve && reserve.dates.length ? reserve.dates.map((date, index) => (
                  <>
                    <DateContainer>
                      <InsertDayContainer>
                        <InputButton
                          label={translate('dayLabel')}
                          iconSize={24}
                          editable={(reserve.status !== 'awaitingPayment' || reserve.status !== 'completed') ? true : false}
                          value={date.normalizedDate}
                          navigateTolist={() => navigateToCalendar(index, reserve.dates, this.props.navigation)}
                        />

                        {/* <DeleteDateContainer
                          activeOpacity={0.8}
                          onPress={() => removeDate(index)}
                        >
                          <DeleteDateIcon source={Images.cancel}/>
                        </DeleteDateContainer> */}
                      </InsertDayContainer>

                      <HoursContainer>
                        <InputButton
                          label={translate('startHourLabel')}
                          iconSize={24}
                          editable={(reserve.status !== 'awaitingPayment' || reserve.status !== 'completed') ? true : false}
                          value={date.start_hour}
                          navigateTolist={() => this.openTimePicker(index, 'start_hour')}
                          marginRigth={'5px'}
                        />

                        <InputButton
                          label={translate('endHourLabel')}
                          iconSize={24}
                          editable={(reserve.status !== 'awaitingPayment' || reserve.status !== 'completed') ? true : false}
                          value={date.end_hour}
                          navigateTolist={() => this.openTimePicker(index, 'end_hour')}
                          marginLeft={'5px'}
                        />
                      </HoursContainer>

                      <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        date={parseISO(date.full_date)}
                        onConfirm={setDayTime}
                        onCancel={this.closeTimePicker}
                      />

                    </DateContainer>

                    <View style={{ marginTop: 40 }} />
                  </>
                )) : null}

                {(reserve.status !== 'awaitingPayment' || reserve.status !== 'completed') ? (
                  <ButtonWithBackground
                    onPress={() => this.insertNewDate()}
                    backgroundColor={Colors.terciary}
                    width={'200px'}
                    text={translate('inserDateButton')}/>
                ) : null}
              {/* </StyledCollapsibleList> */}
              <Divider marginBottom={'15px'}/>
              {/* EVENT DATES */}

              {/* PRICES INFO */}
              <View style={{ marginTop: 20 }}>
                
                <PriceInfoContainer>
                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Regular'}
                    fontSize={'14px'}
                  >
                    {translate('chargeType')}
                  </StyledText>

                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Regular'}
                    fontSize={'14px'}
                  >
                    {translate(spaceOfReserve.charge_type)}
                  </StyledText>
                </PriceInfoContainer>

                <PriceInfoContainer>
                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Regular'}
                    fontSize={'14px'}
                  >
                    {translate('quantity')}
                  </StyledText>

                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Regular'}
                    fontSize={'14px'}
                  >
                    {`${reserve.quantity} ${translate(spaceOfReserve.charge_type == 'perDay' ? 'daysText' : 'hoursText')}`}
                  </StyledText>
                </PriceInfoContainer>

                <PriceInfoContainer>
                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Regular'}
                    fontSize={'14px'}
                  >
                    {translate('serviceChargeLabel')}
                  </StyledText>

                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Regular'}
                    fontSize={'14px'}
                  >
                    {`${this.getCurrencySymbol(spaceOfReserve.monetary_unit)}${toNumber(reserve.amount * 0.10)}`}
                  </StyledText>
                </PriceInfoContainer>
                
                <PriceInfoContainer>
                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Bold'}
                    fontSize={'20px'}
                  >
                    {`${translate('totalLabel')} (${spaceOfReserve.monetary_unit})`}
                  </StyledText>

                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Bold'}
                    fontSize={'20px'}
                  >
                    {`${this.getCurrencySymbol(spaceOfReserve.monetary_unit)}${toNumber(reserve.amount)}`}
                  </StyledText>
                </PriceInfoContainer>
              </View>
              <Divider marginBottom={'20px'}/>
              {/* PRICES INFO */}
              
              {/* CHARGE INFO */}
              {!isEditing ? (
                <>

                  <StyledText
                    fontColor={Colors.labelBlack}
                    fontFamily={'Nunito Bold'}
                    fontSize={'20px'}
                    textAlign={'center'}
                  >
                    {translate('youWontBeChargedYet')}
                  </StyledText>


                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Regular'}
                    fontSize={'14px'}
                    marginBottom={'20px'}
                    textAlign={'center'}
                  >
                    {translate('youWontBeChargedText')}
                  </StyledText>
                  <Divider marginBottom={'15px'}/>
                  {/* CHARGE INFO */}

                  <CustomInput
                    label={translate('messageLabel')}
                    placeholder={translate('reserveSpacesMessage')}
                    value={reserve.message}
                    onChangeText={this.setMessage}
                    marginBottom={20}
                    // onBlur={() => setFieldTouched('description')}
                    height={'300px'}
                    multiline={true}
                  />
                </>
              ) : null}

              <View style={{ marginBottom: 150 }} />
            </Container>
            
            <FooterContainer>
              <StyledText
                fontColor={Colors.labelBlack}
                fontFamily={'Nunito Bold'}
                fontSize={'15px'}
              >
                {`${this.getCurrencySymbol(spaceOfReserve.monetary_unit)}${toNumber(reserve.amount)}`}
              </StyledText>

              <CheckButton
                activeOpacity={0.8}
                onPress={() => this.confirmFunction()}
                disabled={reserve && reserve.dates.length ? false : true}
              >
                <StyledText
                  fontColor={Colors.white}
                  fontFamily={'Nunito Bold'}
                  fontSize={'12px'}
                  textAlign={'center'}
                >
                  {translate('goToNegotiation')}
                </StyledText>
              </CheckButton>
              
            </FooterContainer>
          </>
        ) : null}
      </>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.auth.user,
  reserve: state.manageReserveReducer.reserve,
  eventOfReserve: state.manageReserveReducer.eventOfReserve,
  spaceOfReserve: state.manageReserveReducer.spaceOfReserve,
  isTimePickerVisible: state.manageReserveReducer.isTimePickerVisible,
  showToast: state.manageReserveReducer.showToast,
  toastText: state.manageReserveReducer.toastText,
})

export default connect(mapStateToProps, { ...ManagerReserveActions })(ReserveForm)
