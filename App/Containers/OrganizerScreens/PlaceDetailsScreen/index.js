import React, { Component } from 'react'
import { View, BackHandler, Dimensions, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import { Images, Colors } from 'App/Theme'
import api from '../../../Services/api'

import {
  CarrouselFullScreen,
  AnimationLoading,
  BackButton
} from '../../../Components'

import {
  Container,
  SlideContainer,
  SlideImage,
  SlideCountContainer,
  SlideCount,
  CarouselContainer,
  CarouselFooterContainer,
  PlaceDetailsHeader,
  BackButtonContainer,
  PlaceTitle,
} from './styles'

export class PlaceDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      space: {},
      feedbackType: '',
      activeImageIndex: 0,
      isModalOpen: false,
    }
  }

  componentDidMount() {
    this.loadMyEvents()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  loadMyEvents = async () => {
    const id = this.props.navigation.getParam('space_id', null)

    this.setState({ loading: true })

    try {
      const { data } = await api.get(`/space/${id}`, {}, {
        authorization: `Bearer ${this.props.user.token}`
      })

      this.setState({
        space: data,
        loading: false,
        feedbackType: 'emptyFeedback'
      })

    } catch (error) {
      this.setState({ loading: false, feedbackType: 'error' })
      console.log({error})
    }
  }

  showModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  onSnapToItem = (index) => {
    this.setState({ activeImageIndex: index })
  }

  goBack = () => {
    this.props.navigation.goBack(null)
  }

  render() {
    const { space, activeImageIndex, isModalOpen } = this.state
    console.log(space)
    return (
      <>
      {this.state.loading ? (
        <AnimationLoading
          fullscreen={true}
          loading={this.state.loading}
        />
      ) : (
        <>
          <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
          <PlaceDetailsHeader>
            <BackButtonContainer onPress={() => this.goBack()}>
              <BackButton color={Colors.white} size={20}/>
            </BackButtonContainer>

          </PlaceDetailsHeader>

          {space.Images ? (
            <CarouselContainer>
              <Carousel
                data={space.Images}
                renderItem={ ({item, index}) => {
                  return (
                    <SlideContainer
                      activeOpacity={0.8}
                      onPress={() => this.showModal()}>
                      <SlideImage 
                        key={index}
                        source={{ uri: item.url }}
                      />
                    </SlideContainer>
                  )
                }}
                onSnapToItem={this.onSnapToItem}
                sliderWidth={Dimensions.get('window').width} 
                itemWidth={Dimensions.get('window').width}
                removeClippedSubviews={false}
                firstItem={activeImageIndex}
              />

              <CarouselFooterContainer>
                <SlideCountContainer>
                  <SlideCount>{`${activeImageIndex + 1}/${space.Images.length}`}</SlideCount>
                </SlideCountContainer>
              </CarouselFooterContainer>

              <CarrouselFullScreen
                data={space.Images}
                onSnapToItem={this.onSnapToItem}
                showModal={this.showModal}
                isModalOpen={isModalOpen}
                activeImageIndex={activeImageIndex}
              />
            </CarouselContainer>
          ) : (
            <SlideImage source={Images.image_background} />
          )}
          <Container>
            <PlaceTitle>{space.name}</PlaceTitle>
            
          </Container>
        </>
      )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetailsScreen)
