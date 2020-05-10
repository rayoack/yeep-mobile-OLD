import React, { Component } from 'react'
import { BackHandler, Modal, StatusBar } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { format, parseISO } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale'
import IconMI from 'react-native-vector-icons/MaterialIcons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import Shimmer from 'react-native-shimmer';

import { Images, Colors } from 'App/Theme'
import { translate } from '../../../Locales'
import { getLanguageToDateFNS } from '../../../Locales/normalizeLanguage'
import api from '../../../Services/api'

import {
  ReadMoreText,
  BackButton
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
  EventSubText
} from './styles'

export class EventDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {},
      loading: false,
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
        authorization: `Bearer ${this.props.user.token}`
      })

      const event = this.formatDates(data)

      this.setState({ event, loading: false })

    } catch (error) {
      this.setState({ loading: false })
      console.log({error})
    }
  }

  _shimmerLoading = (loading) => {
    return (
      <>
        <Shimmer>
          <EventCover />
        </Shimmer>
        <EventContainer loading={loading}>
          <Shimmer>
            <EventTitle loading={loading}></EventTitle>
          </Shimmer>
        </EventContainer>

        <EventContainer loading={loading}>
          <Shimmer>
            <EventLabel loading={loading}></EventLabel>
          </Shimmer>
        </EventContainer>

        <EventContainer loading={loading}>
          <Shimmer>
            <EventLabel loading={loading}></EventLabel>
          </Shimmer>
        </EventContainer>

        <EventContainer loading={loading}>
          <Shimmer>
            <EventLabel loading={loading}></EventLabel>
          </Shimmer>
        </EventContainer>
      </>
    )
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

  render() {
    const { event, loading } = this.state

    console.log(event)
    return (
      <Container>
        <StatusBar hidden/>

        {loading ? (
          this._shimmerLoading(loading)
        ) : (
          <>
            <EventHeader>
              <BackButtonContainer
                onPress={() => this.props.navigation.goBack(null)}>
                <BackButton color={Colors.white} size={30}/>
              </BackButtonContainer>
            </EventHeader>

            <EventCover 
              hasCover={event.event_logo ? true : false}
              source={event.event_logo == null ? Images.image_background : {
                uri: event.event_logo ?
                  event.event_logo.url : ''
              }}/>
            
            <EventContainer>
              <EventTitle>{event.title}</EventTitle>

              {/* ONLINE */}
              {event.online ? (
                <>
                  <EventRowContainer>
                    <IconMI
                      name={'place'}
                      size={20}
                      color={Colors.textDefault}
                      style={{ marginRight: 10 }}/>
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
                    <IconMI
                      name={'place'}
                      size={20}
                      color={Colors.textDefault}
                      style={{ marginRight: 10 }}/>
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
                    <IconMCI
                      name={'clock-outline'}
                      size={20}
                      color={Colors.textDefault}
                      style={{ marginRight: 10 }}/>
                    <EventText>{`${translate('startDay')}: ${event.dates[0].normalizedDate}`}</EventText>
                  </EventRowContainer>
                  <EventSubText>{`${event.dates[0].start_hour} - ${event.dates[0].end_hour}`}</EventSubText>

                  {event.dates.length > 1 ? (
                    <>
                      <EventRowContainer>
                        <IconMCI
                          name={'clock-outline'}
                          size={20}
                          color={Colors.textDefault}
                          style={{ marginRight: 10 }}/>
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
                  event.dates.map(date => (
                    <>
                      <EventRowContainer>
                        <IconMCI
                          name={'clock-outline'}
                          size={20}
                          color={Colors.textDefault}
                          style={{ marginRight: 10 }}/>
                        <EventText>{date.normalizedDate}</EventText>
                      </EventRowContainer>
                      <EventSubText>{`${date.start_hour} - ${date.end_hour}`}</EventSubText>
                    </>
                  ))
              ) : null}

              {/* <Modal
                visible={isModalOpen}
                animationType={'fade'}
              >
                <ModalContainer>
                  <ModalIconContainer>
                    <CloseButton
                      size={26}
                      name={'close'}
                      onPress={showModal}
                      color={'#FFF'}
                    />
                  </ModalIconContainer>
                  <CarouselImage
                    intl={intl}
                    data={data}
                    carouselWidth={carouselWidth}
                    firstItem={activeDotIndex}
                    activeDotIndex={activeDotIndex}
                    onSnapToItem={onSnapToItem}
                    isModalOpen={isModalOpen}
                    actualProduct={actualProduct}
                    photosLengthDescription={photosLengthDescription}
                    tagAnimationStart={tagAnimationStart}
                  />
                </ModalContainer>
              </Modal> */}
            </EventContainer>
          </>
        )}
      </Container>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsScreen)
