import React, { Component } from 'react'
import { BackHandler, Modal } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { connect } from 'react-redux'
import Shimmer from 'react-native-shimmer';

import { Images, Colors } from 'App/Theme'
import { translate } from '../../../Locales'
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
  styles
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

      this.setState({ event: data, loading: false })

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
        <EventContainer>
          <Shimmer>
            <EventTitle loading={loading}></EventTitle>
          </Shimmer>
        </EventContainer>

        <EventContainer>
          <Shimmer>
            <EventLabel loading={loading}></EventLabel>
          </Shimmer>
        </EventContainer>

        <EventContainer>
          <Shimmer>
            <EventLabel loading={loading}></EventLabel>
          </Shimmer>
        </EventContainer>

        <EventContainer>
          <Shimmer>
            <EventLabel loading={loading}></EventLabel>
          </Shimmer>
        </EventContainer>
      </>
    )
  }

  render() {
    const { event, loading } = this.state

    console.log(event)
    return (
      <Container>
        {loading ? (
          this._shimmerLoading(loading)
        ) : (
          <>
            <EventHeader>
              <BackButtonContainer
                onPress={() => this.props.navigation.goBack(null)}>
                <BackButton color={Colors.labelBlack} size={30}/>
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
