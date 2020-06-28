import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import differenceInHours from 'date-fns/differenceInHours'

import { parseISO, isBefore, isAfter, formatISO } from 'date-fns';
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import setSeconds from 'date-fns/setSeconds'
import { translate, toNumber } from '../../../Locales'
import currencies from '../../../Services/currencies.json'
import { Images, Colors } from '../../../Theme'
import { normalizedDates } from '../../../Services/datesHelpers'

import {
  CustomInput,
  InputButton
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
      message: translate('reserveSpacesMessage'),
      reserve: null,
      space: null,
      event: null,
      datesListText: translate('showMore'),
      restrictionsButtonText: translate('showLess'),
    }
  }

  componentDidMount = () => {
    this.setReserveForm()
  }

  setReserveForm = () => {

    const space = this.props.navigation.getParam('space', null)
    const event = this.props.navigation.getParam('event', null)

    let newReserve = {
      start_date: event.dates[0].full_date,
      end_date: this.setEndDate(
        parseISO(event.dates[event.dates.length - 1].day),
        event.dates[event.dates.length - 1].end_hour),
      amount: 0,
      quantity: 0,
      space_id: space.id,
      event_id: event.id,
      status: "waitingForApproval",
    }

    this.setState({
      reserve: newReserve,
      space,
      event
    })

    this.setState(prevState => {
      return {
        reserve: newReserve,
        space,
        event
      }
    }, () => space.charge_type == 'perDay' ?
      this.setAmountPerDay()
      : this.setAmountPerHour())
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
    const { reserve, event, space } = this.state
    if(reserve && event && space) {
      let reserveCopy = { ...reserve }
  
      reserveCopy.quantity = event.dates.length
      reserveCopy.amount = event.dates.length * space.price

      this.setState({ reserve: reserveCopy })
    }

  }

  setAmountPerHour = () => {
    const { reserve, event, space } = this.state

    if(reserve && event && space) {
      let reserveCopy = { ...reserve }
      let quantityTotal = 0

      event.dates.map(date => {
        const totalDateHours = this.calculateTotalHours(
          date.start_hour,
          parseISO(date.day),
          date.end_hour)

        quantityTotal = quantityTotal + totalDateHours
      })
  
      reserveCopy.quantity = quantityTotal
      reserveCopy.amount = quantityTotal * space.price

      this.setState({ reserve: reserveCopy })
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

  setMessage = (message) => this.setState({ message })

  setDatesListText = (text) => this.setState({ datesListText: text })

  render() {
    const { reserve, message, event, space, datesListText } = this.state
    const eventsWithFormatedDates = normalizedDates(event)

    return (
      <>
        {reserve ? (
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
                    {space.name}
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
                        {translate(space.category)}
                      </StyledText>

                      <StyledText
                        numberOfLines={2}
                      >
                        {`${this.getCurrencySymbol(space.monetary_unit)}${toNumber(space.price)} / ${translate(space.charge_type)}`}
                      </StyledText>
                    </StyledView>

                    <StyledText>{space.description}</StyledText>
                  </View>

                  {/* SPACE IMAGE */}
                  <View style={{ flex: 1, alignItems: 'flex-end' }} >
                    {space.Images.length ? (
                      <StyledImage
                        borderRadius={10}
                        source={{ uri: space.Images[0].url }}
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


              <StyledCollapsibleList
                numberOfVisibleItems={1}
                onToggle={collapsed =>
                  collapsed
                    ? this.setDatesListText(translate('showMore'))
                    : this.setDatesListText(translate('showLess'))
                }
                buttonContent={
                  <ViewMoreButton>
                    <StyledText
                      fontColor={Colors.secondary}
                      fontFamily={'Nunito Bold'}
                      fontSize={'15px'}
                    >
                      {datesListText}
                    </StyledText>
                  </ViewMoreButton>
                }
              >
                {eventsWithFormatedDates && eventsWithFormatedDates.dates.map((date, index) => (
                  <DateContainer>
                    <InsertDayContainer>
                      <InputButton
                        label={translate('dayLabel')}
                        iconSize={24}
                        editable={false}
                        value={date.normalizedDate}
                        navigateTolist={() => null}
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
                        editable={false}
                        value={date.start_hour}
                        navigateTolist={() => null}
                        marginRigth={'5px'}
                      />

                      <InputButton
                        label={translate('endHourLabel')}
                        iconSize={24}
                        editable={false}
                        value={date.end_hour}
                        navigateTolist={() => null}
                        marginLeft={'5px'}
                      />
                    </HoursContainer>

                    {/* <DateTimePickerModal
                      isVisible={isTimePickerVisible}
                      mode="time"
                      date={parseISO(date.full_date)}
                      onConfirm={setDayTime}
                      onCancel={closeTimePicker}
                    /> */}

                  </DateContainer>
                ))}
              </StyledCollapsibleList>
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
                    {translate(space.charge_type)}
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
                    {`${reserve.quantity} ${translate(space.charge_type == 'perDay' ? 'daysText' : 'hoursText')}`}
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
                    {`${this.getCurrencySymbol(space.monetary_unit)}${toNumber(reserve.amount * 0.10)}`}
                  </StyledText>
                </PriceInfoContainer>
                
                <PriceInfoContainer>
                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Bold'}
                    fontSize={'20px'}
                  >
                    {`${translate('totalLabel')} (${space.monetary_unit})`}
                  </StyledText>

                  <StyledText
                    fontColor={Colors.textDefault}
                    fontFamily={'Nunito Bold'}
                    fontSize={'20px'}
                  >
                    {`${this.getCurrencySymbol(space.monetary_unit)}${toNumber(reserve.amount)}`}
                  </StyledText>
                </PriceInfoContainer>
              </View>
              <Divider marginBottom={'20px'}/>
              {/* PRICES INFO */}
              
              {/* CHARGE INFO */}
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
                placeholder={message}
                value={message}
                onChangeText={this.setMessage}
                marginBottom={20}
                // onBlur={() => setFieldTouched('description')}
                height={'300px'}
                multiline={true}
              />
              <View style={{ marginBottom: 150 }} />
            </Container>
            
            <FooterContainer>
              <StyledText
                fontColor={Colors.labelBlack}
                fontFamily={'Nunito Bold'}
                fontSize={'15px'}
              >
                {`${this.getCurrencySymbol(space.monetary_unit)}${toNumber(reserve.amount)}`}
              </StyledText>

              <CheckButton
                activeOpacity={0.8}
                onPress={() => null}
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

export default ReserveForm
