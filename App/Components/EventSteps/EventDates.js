import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, View } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { parseISO, isBefore, isAfter } from 'date-fns';

import CustomInput from '../CustomInput'
import CustomPicker from '../CustomPicker'
import InputButton from '../InputButton'
import Calendar from '../Calendar'

import { translate } from '../../Locales'
import { Images, Colors } from 'App/Theme'
import { normalizedDates } from '../../Services/datesHelpers'

import {
  Container,
  ViewContainer,
  EventStepLabel,
  EventStepText,
  DateContainer,
  HoursContainer } from './styles'

export const EventDates = ({
  event,
  navigateToCalendar,
  isTimePickerVisible,
  openTimePicker,
  closeTimePicker,
  setDayTime,
}) => {

  const eventsWithFormatedDates = normalizedDates(event)

  return (
    <Container>
      <ViewContainer>
        <EventStepLabel>{translate('fourthEditEventStepTitle')}</EventStepLabel>
        <EventStepText>{translate('fourthEditEventStepText')}</EventStepText>
        
        {!eventsWithFormatedDates.dates.length ? (
          <ButtonWithBackground
            onPress={() => showImagePicker('', 'multiple')}
            width={'150px'}
            text={translate('secondEditEventStepTitle')}/>
        ) : (
          <>
            {eventsWithFormatedDates.dates.map((date, index) => (
              <DateContainer>
                <InputButton
                  iconSize={24}
                  value={date.normalizedDate}
                  navigateTolist={() => navigateToCalendar(index)}
                />

                <HoursContainer>
                  <InputButton
                    iconSize={24}
                    value={date.start_hour}
                    navigateTolist={() => openTimePicker(index, 'start_hour')}
                  />

                  <InputButton
                    iconSize={24}
                    value={date.end_hour}
                    navigateTolist={() => openTimePicker(index, 'end_hour')}
                  />
                </HoursContainer>

                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  date={parseISO(date.full_date)}
                  onConfirm={setDayTime}
                  onCancel={closeTimePicker}
                />
              </DateContainer>
            ))}
          </>
        )}
      </ViewContainer>
    </Container>
  )
}

EventDates.defaultProps = {
  event: { dates: [] },
  isTimePickerVisible: false,
  setSaveNextStepForm: () => null,
  openTimePicker: () => null,
  closeTimePicker: () => null,
  setDayTime: () => null,
}

const mapStateToProps = (state) => ({
  event: state.manageEventReducer.event
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDates)
