import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { parseISO } from 'date-fns';

import InputButton from '../InputButton'
import ButtonWithBackground from '../ButtonWithBackground'

import { translate } from '../../Locales'
import { Images, Colors } from 'App/Theme'
import { normalizedDates } from '../../Services/datesHelpers'

import {
  Container,
  ViewContainer,
  EventStepLabel,
  EventStepText,
  DateContainer,
  HoursContainer,
  InsertDateButton,
  InsertDateButtonText,
  InsertDayContainer,
  DeleteDateContainer,
  DeleteDateIcon} from './styles'

export const EventDates = ({
  event,
  navigateToCalendar,
  isTimePickerVisible,
  openTimePicker,
  closeTimePicker,
  setDayTime,
  insertNewDate,
  removeDate,
}) => {
  const eventsWithFormatedDates = normalizedDates(event)

  return (
    <Container>
      <ViewContainer>
        <EventStepLabel>{translate('fourthEditEventStepTitle')}</EventStepLabel>
        <EventStepText>{translate('fourthEditEventStepText')}</EventStepText>
        
        {!eventsWithFormatedDates.dates || !eventsWithFormatedDates.dates.length ? (
          <>
            <ButtonWithBackground
              onPress={() => insertNewDate()}
              width={'200px'}
              text={translate('inserDateButton')}/>

            <View style={{ marginBottom: 100 }} />
          </>
        ) : (
          <>
            {eventsWithFormatedDates.dates.map((date, index) => (
              <DateContainer>
                <InsertDayContainer>
                  <InputButton
                    label={translate('dayLabel')}
                    iconSize={24}
                    value={date.normalizedDate}
                    navigateTolist={() => navigateToCalendar(index)}
                  />

                  <DeleteDateContainer
                    activeOpacity={0.8}
                    onPress={() => removeDate(index)}
                  >
                    <DeleteDateIcon source={Images.cancel}/>
                  </DeleteDateContainer>
                </InsertDayContainer>

                <HoursContainer>
                  <InputButton
                    label={translate('startHourLabel')}
                    iconSize={24}
                    value={date.start_hour}
                    navigateTolist={() => openTimePicker(index, 'start_hour')}
                    marginRigth={'5px'}
                  />

                  <InputButton
                    label={translate('endHourLabel')}
                    iconSize={24}
                    value={date.end_hour}
                    navigateTolist={() => openTimePicker(index, 'end_hour')}
                    marginLeft={'5px'}
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

            <InsertDateButton onPress={() => insertNewDate()}>
              <InsertDateButtonText>{translate('inserDateButton')}</InsertDateButtonText>
            </InsertDateButton>
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
  insertNewDate: () => null,
}

const mapStateToProps = (state) => ({
  event: state.manageEventReducer.event
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDates)
