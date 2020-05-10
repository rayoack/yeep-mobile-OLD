import * as RNLocalize from "react-native-localize";

const normalizeTranslate = {
  'en_US': 'enUS',
  'en-US': 'enUS',
  'pt_BR': 'ptBR',
  'pt-BR': 'ptBR',
  'en': 'enUS',
  'pt_US': 'ptBR',
  'pt_PT': 'ptBR',
  'pt-PT': 'ptBR',
  'pt': 'ptBR',
}

const getLanguageByDevice = () => {
  const locales = RNLocalize.getLocales();

  return locales[0].languageTag;
}

export const getLanguageToDateFNS = () => {
  const language = getLanguageByDevice()
  const translateNormalize = normalizeTranslate.hasOwnProperty(language) ?
    normalizeTranslate[language]
    : 'en'

  return translateNormalize
}