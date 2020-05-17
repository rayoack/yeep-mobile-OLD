import { enUS, ptBR } from 'date-fns/locale'
import { format, parseISO } from 'date-fns';
import { getLanguageToDateFNS } from '../Locales/normalizeLanguage'

export const normalizedDates = (event) => {
  let eventCopy = { ...event }

  const locales = { enUS, ptBR }
  const userLocal = getLanguageToDateFNS()

  if(eventCopy.dates == null || eventCopy.dates.length == 0) return event

  eventCopy.dates = eventCopy.dates.map(date => {
    let formatedDate = format(parseISO(date.day), 'PPPP', {
      locale: locales.hasOwnProperty(userLocal) ? locales[userLocal] : locales['enUS']
    })

    date.normalizedDate = formatedDate

    return date
  })

  return eventCopy
}
