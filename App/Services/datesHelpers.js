import { enUS, ptBR } from 'date-fns/locale'
import _ from 'lodash'
import { NavigationActions } from 'react-navigation';

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

import { Creators as ManagerReserveActions } from '../../App/Stores/reducers/manageReserveReducer'
import { getLanguageToDateFNS } from '../Locales/normalizeLanguage'
import { store } from '../Stores/CreateStore'

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

  console.log({dataToNormalizeCopy})

  return dataToNormalizeCopy
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
  console.log({selectedDay})
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
  // this.props.navigation.navigate('CreationEventSteps')
  
  actualNavigation.navigate('ReserveForm')
}
