import { enUS, ptBR } from 'date-fns/locale'
import _ from 'lodash'
import { NavigationActions } from 'react-navigation';

import { format, parseISO, isBefore, isAfter, parse } from 'date-fns';
import isValid from 'date-fns/isValid'
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

import { Creators as ManagerReserveActions } from '../../App/Stores/reducers/manageReserveReducer'
import { getLanguageToDateFNS } from '../Locales/normalizeLanguage'
import { store } from '../Stores/CreateStore'
import { translate } from '../Locales'

// DATES
export const normalizedDates = (dataToNormalize) => {
  let dataToNormalizeCopy = { ...dataToNormalize }

  const locales = { enUS, ptBR }
  const userLocal = getLanguageToDateFNS()

  if(dataToNormalizeCopy.dates == null || dataToNormalizeCopy.dates.length == 0) return dataToNormalize

  dataToNormalizeCopy.dates = dataToNormalizeCopy.dates.map(date => {
    let formatedDate = format(parseISO(date.day), 'PPPP', {
      locale: locales.hasOwnProperty(userLocal) ? locales[userLocal] : locales['enUS']
    })

    date.normalizedDate = formatedDate

    return date
  })

  return dataToNormalizeCopy
}

export const normalizeOneDate = (date) => {
  const locales = { enUS, ptBR }
  const userLocal = getLanguageToDateFNS()

  if(!isValid(date)) return ''

  console.log({date})

  let formatedDate = format(date, `hh:mm, PPPP`, {
    locale: locales.hasOwnProperty(userLocal) ? locales[userLocal] : locales['enUS']
  })

  return formatedDate
}

let actualNavigation

export const navigateToCalendar = (index = 0, dates = [], navigation) => {
  store.dispatch(ManagerReserveActions.setSelectedDayIndex(index))
  let markedDates = {}
  actualNavigation = navigation

  if(dates && dates.length) {
    let reserveDates = dates.map(date => {
      markedDates[date.day] = {selected: true}
    })
  }

  navigation.push('Calendar', {
    markedDates,
    onDayPress: setReserveDay
  })
}

export const setReserveDay = (selectedDay) => {
  const state = store.getState();

  const reserve = state.manageReserveReducer.reserve;
  const selectedDayIndex = state.manageReserveReducer.selectedDayIndex;

  let reserveDates = [ ...reserve.dates ]

  reserveDates.map((date, index) => {
    if(index == selectedDayIndex) {
      const [year, month, day] = selectedDay.dateString.split('-')
      const newFullDate = formatISO(setDate(setMonth(setYear(parseISO(date.full_date), year), month - 1), day))
      date.full_date = newFullDate
      date.day = selectedDay.dateString
    }

    return date
  })

  const datesFormatted = normalizedDates({ dates: reserveDates })

  const orderDates = _.orderBy(datesFormatted.dates, ['day'], ['asc'])
  store.dispatch(ManagerReserveActions.setReserveDates(orderDates))
  
  actualNavigation.navigate('ReserveForm')
}

// TIME

const startHourAvailable = (startTime, day, endHourTime) => {

  const [startHour, startMinute] = startTime.split(':');
  const [endHour, endMinute] = endHourTime.split(':');

  const fullStart = setSeconds(setMinutes(setHours(day, startHour), startMinute), 0)
  const fullEnd = setSeconds(setMinutes(setHours(day, endHour), endMinute), 0)
  const available = isBefore(fullStart, fullEnd)
  
  return available
}

const endHourAvailable = (endTime, day, startHourTime) => {

  const [endHour, endMinute] = endTime.split(':');
  const [startHour, startMinute] = startHourTime.split(':');

  const fullStart = setSeconds(setMinutes(setHours(day, startHour), startMinute), 0)
  const fullEnd = setSeconds(setMinutes(setHours(day, endHour), endMinute), 0)
  const available = isAfter(fullEnd, fullStart)
  
  return available
}

export const setDayTime = (time) => {
  
  store.dispatch(ManagerReserveActions.setTimePickerVisible(false))
  const state = store.getState();

  const reserve = state.manageReserveReducer.reserve;
  const selectedDayIndex = state.manageReserveReducer.selectedDayIndex;
  const hourType = state.manageReserveReducer.hourType;

  const selectedHour = format(getTime(time), 'HH:mm')

  let reserveDates = [ ...reserve.dates ]

  reserveDates.map((date, index) => {
    if(index == selectedDayIndex) {

      if(hourType == 'start_hour') {
        const available = startHourAvailable(
          selectedHour,
          parseISO(date.day),
          date.end_hour)

          // TOAST
          if(!available) {
            store.dispatch(ManagerReserveActions.setTimePickerVisible(false))
            store.dispatch(ManagerReserveActions.setToastText(translate('startHourError')))
            store.dispatch(ManagerReserveActions.setShowToast(true))

            return setTimeout(() => {
              store.dispatch(ManagerReserveActions.setShowToast(false))
              store.dispatch(ManagerReserveActions.setToastText(''))
            }, 3000);
          }

          const [startHour, startMinute] = selectedHour.split(':')
          date.full_date = formatISO(setSeconds(setMinutes(setHours(parseISO(date.full_date), startHour), startMinute), 0))

      } else {
        const available = endHourAvailable(
          selectedHour,
          parseISO(date.day),
          date.start_hour)

          // TOAST
          if(!available) {
            store.dispatch(ManagerReserveActions.setTimePickerVisible(false))
            store.dispatch(ManagerReserveActions.setToastText(translate('endHourError')))
            store.dispatch(ManagerReserveActions.setShowToast(true))

            return setTimeout(() => {
              store.dispatch(ManagerReserveActions.setShowToast(false))
              store.dispatch(ManagerReserveActions.setToastText(''))
            }, 3000);
          }
      }

      date[hourType] = selectedHour
    }

    return date
  })

  store.dispatch(ManagerReserveActions.setReserveDates(reserveDates))
}