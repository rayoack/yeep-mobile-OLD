import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, View } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';

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
  setSaveNextStepForm,
  setDescription,
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

                {/* <HoursContainer>
                  <CustomPicker
                    actualValue={values.country}
                    values={countries}
                    onValueChange={value => {
                      this.setCountryStates(value)
                      setFieldValue('country', value)
                    }}
                    label={translate('yourCountry')}
                    marginBottom={30}
                    // error={errors.country}
                    // errorText={errors.country}
                  />
                  <CustomPicker
                    actualValue={values.country}
                    values={countries}
                    onValueChange={value => {
                      this.setCountryStates(value)
                      setFieldValue('country', value)
                    }}
                    label={translate('yourCountry')}
                    marginBottom={30}
                    // error={errors.country}
                    // errorText={errors.country}
                  />
                </HoursContainer> */}
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
  setSaveNextStepForm: () => null,
  setDescription: () => null,
}

const mapStateToProps = (state) => ({
  event: state.manageEventReducer.event
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDates)
