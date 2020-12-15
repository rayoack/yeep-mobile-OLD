import React, { Component } from 'react'
import { BackHandler, Modal, StatusBar, Dimensions } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { format, parseISO } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale'
import IconIO from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import Shimmer from 'react-native-shimmer';
import { NavigationEvents } from 'react-navigation';

import { Images, Colors } from 'App/Theme'
import { translate } from '../../../Locales'
import { getLanguageToDateFNS } from '../../../Locales/normalizeLanguage'
import api from '../../../Services/api'

import {
  ReadMoreText,
  BackButton,
  CarrouselFullScreen,
  AnimationLoading
} from '../../../Components'


import {
  Container,
  EventHeader,
  EventCover,
  EventTitle,
  EventLabel,
  EventContainer,
  BackButtonContainer,
  EventText,
  EventRowContainer,
  EventSubText,
  EventDivider,
  EventImagesContainer,
  EventImageButtonContainer,
  EventImages,
  EventIcon,
  EventActionContainer,
  EventActionLabelContainer,
  EventActionLabel,
  EventActionIcon
} from './styles'

export class EventDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {
        users: []
      },
      loading: false,
      activeImageIndex: 0,
      isModalOpen: false,
    }
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.loadEventDetails()
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null)
    return true;
  }

  loadEventDetails = async () => {
    const id = this.props.navigation.getParam('event_id', null)

    try {
      this.setState({ loading: true })
      
      const { data } = await api.get(`/events/${id}`, {}, {
        authorization: `Bearer ${this.props.current_user.token}`
      })

      const event = this.formatDates(data)

      this.setState({ event, loading: false })

    } catch (error) {
      this.setState({ loading: false })
      console.log({error})
    }
  }

  formatDates = (event) => {
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

  showModal = () => {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  onSnapToItem = (index) => {
    this.setState({ activeImageIndex: index, isModalOpen: true })
  }

  render() {
    const { current_user } = this.props
    const { event, loading, isModalOpen, activeImageIndex } = this.state
    const isAdmin = event.users.filter(user => user.id == current_user.id)

    return (
      <Container>
        <NavigationEvents
          onWillFocus={() => this.loadEventDetails()}
          // onDidFocus={() => this.redirectIfLogged()}
        />
        
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>

        {loading ? (
          <AnimationLoading
            fullscreen={true}
            loading={loading}/>
        ) : (
          <>
            <EventHeader>
              <BackButtonContainer
                onPress={() => this.props.navigation.goBack()}>
                <BackButton color={Colors.white} size={30}/>
              </BackButtonContainer>
            </EventHeader>

            <EventCover 
              hasCover={event.event_logo ? true : false}
              source={event.event_logo == null ? Images.image_background : {
                uri: event.event_logo ?
                  event.event_logo.url : ''
              }}/>
            
            {isAdmin.length >= 1 ? (
              <>
                <EventActionContainer onPress={
                  () => this.props.navigation.push('ReservesList', {
                    targetId: event.id,
                    request_type: 'event'
                  })
                }>
                  <EventActionLabelContainer>
                    <EventActionIcon source={Images.negociations_icon}/>
                    <EventActionLabel>{translate('eventNegocationsLabel')}</EventActionLabel>
                  </EventActionLabelContainer>

                  <IconIO
                    name={'ios-arrow-forward'}
                    size={20}
                    color={Colors.textDefault}/>
                </EventActionContainer>
                
                <EventActionContainer onPress={
                  () => this.props.navigation.push('EditEventScreen', {
                    event
                  })
                }>
                  <EventActionLabelContainer>
                    <EventActionIcon source={Images.pencil}/>
                    <EventActionLabel>{translate('eventEditLabel')}</EventActionLabel>
                  </EventActionLabelContainer>

                  <IconIO
                    name={'ios-arrow-forward'}
                    size={20}
                    color={Colors.textDefault}/>
                </EventActionContainer>
              </>
            ) : null}

            <EventContainer>
              <EventTitle>{event.title}</EventTitle>

              {/* ONLINE */}
              {event.online ? (
                <>
                  <EventRowContainer>
                    <EventIcon source={Images.located}/>
                    <EventText>Online</EventText>
                  </EventRowContainer>

                  {event.location_name ? <EventText>{event.location_name}</EventText> : null}
                  {event.adress ? <EventText>{event.adress}</EventText> : null}
                </>
              ) : null}

              {/* ADRESS */}
              {(event.adress && !event.online) ? (
                <>
                  <EventRowContainer>
                    <EventIcon source={Images.located}/>
                    <EventText>{event.location_name}</EventText>
                  </EventRowContainer>

                  <EventSubText>{`${event.adress}, ${event.city}, ${event.state}, ${event.country}`}</EventSubText>
                </>
              ) : null}

              {/* EVENTS WITH TWO DATES */}
              {(event.dates &&
                event.dates.length == 2 &&
                event.dates[0].normalizedDate) ? (
                <>
                  <EventRowContainer>
                    <EventIcon source={Images.square_clock}/>
                    <EventText>{`${translate('startDay')}: ${event.dates[0].normalizedDate}`}</EventText>
                  </EventRowContainer>
                  <EventSubText>{`${event.dates[0].start_hour} - ${event.dates[0].end_hour}`}</EventSubText>

                  {event.dates.length > 1 ? (
                    <>
                      <EventRowContainer>
                        <EventIcon source={Images.square_clock}/>
                        <EventText>{`${translate('endDay')}: ${event.dates[1].normalizedDate}`}</EventText>
                      </EventRowContainer>
                      <EventSubText>{`${event.dates[1].start_hour} - ${event.dates[1].end_hour}`}</EventSubText>
                    </>
                    ) : null}
                </>
              ) : null}

              {/* EVENTS WITH MORE DATES */}
              {(event.dates &&
                event.dates.length > 2 &&
                event.dates[0].normalizedDate) ? (
                  event.dates.map((date, index) => (
                    <>
                      <EventRowContainer key={index}>
                        <EventIcon source={Images.square_clock}/>
                        <EventText>{date.normalizedDate}</EventText>
                      </EventRowContainer>
                      <EventSubText>{`${date.start_hour} - ${date.end_hour}`}</EventSubText>
                    </>
                  ))
              ) : null}

              <EventDivider />

              {(event.event_images && event.event_images.length) ? (
                <>
                  <EventLabel>{translate('eventImagesLabel')}</EventLabel>
                  <EventImagesContainer horizontal>
                    {event.event_images.map((image, index) => (
                      <EventImageButtonContainer
                        key={index}
                        onPress={() => this.onSnapToItem(index)}>
                        <EventImages source={{ uri: image.url }} />
                      </EventImageButtonContainer>
                    ))}
                  </EventImagesContainer>
                </>
              ) : null}

              <CarrouselFullScreen
                data={event.event_images}
                onSnapToItem={this.onSnapToItem}
                showModal={this.showModal}
                isModalOpen={isModalOpen}
                activeImageIndex={activeImageIndex}
              />

              <EventDivider />

              {/* DESCRIPTION */}
              {event.description ? (
                <>
                  <EventLabel>{translate('eventDescriptionLabel')}</EventLabel>
                  <ReadMoreText
                    name={'eventDescription'}
                    text={event.description}
                  />
                </>
              ) : null}
              
              <EventDivider final={true}/>

            </EventContainer>
          </>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.auth.user
})

export default connect(
  mapStateToProps
)(EventDetailsScreen)
