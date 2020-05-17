import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { getLanguageToDateFNS } from '../../Locales/normalizeLanguage'
import { LocaleConfig, CalendarList } from 'react-native-calendars';
import { Images, Colors } from 'App/Theme'

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};

LocaleConfig.locales['en', 'enUS'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'Jul', 'August', 'Sept', 'Oct', 'Nov', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today'
};

LocaleConfig.locales['ptBR'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Março', 'Abril', 'Maio', 'Jun', 'Jul', 'Agosto', 'Set', 'Otub.', 'Nov', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = getLanguageToDateFNS();

class Calendar extends Component {

  render() {
    const markedDates = this.props.navigation.getParam('markedDates', {})
    const markingType = this.props.navigation.getParam('markingType', 'simple')
    const minDate = this.props.navigation.getParam('minDate', new Date())
    const maxDate = this.props.navigation.getParam('maxDate', null)
    const onDayPress = this.props.navigation.getParam('onDayPress', () => null)

    return (
      <>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>

        <CalendarList
          markedDates={markedDates}
          minDate={minDate}
          maxDate={maxDate}
          onDayPress={(day) => onDayPress(day)}
          markingType={markingType}
          theme={{
            backgroundColor: Colors.nigthPurple,
            calendarBackground: Colors.nigthPurple,
            textSectionTitleColor: Colors.lightBlue,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: Colors.secondary,
            todayTextColor: Colors.saintBlue,
            dayTextColor: Colors.white,
            textDisabledColor: Colors.blueViolet,
            dotColor: Colors.primary,
            selectedDotColor: Colors.primary,
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: Colors.primary,
            indicatorColor: Colors.saintBlue,
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16
          }}
        />
      </>
    )
  }
}

export default Calendar
