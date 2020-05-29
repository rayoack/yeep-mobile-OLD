import React, { Component } from 'react'
import { View, BackHandler, Dimensions, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import { translate } from '../../../Locales'
import { Images, Colors } from 'App/Theme'
import api from '../../../Services/api'

import {
  CarrouselFullScreen,
  AnimationLoading,
  BackButton,
  Feedback,
  BetterReadMore
} from '../../../Components'

import {
  Container,
  PlaceDivider,
  SlideContainer,
  SlideImage,
  SlideCountContainer,
  SlideCount,
  CarouselContainer,
  CarouselFooterContainer,
  PlaceDetailsHeader,
  BackButtonContainer,
  PlaceTitle,
  RowContainer,
  IconImage,
  IconTitle,
  PlaceLabel,
  CenterView,
  PlaceText,
  TouchableView,
  ProfileImage
} from './styles'

export class PlaceDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      space: null,
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

  categoriesMapped = (category) => {
    if(!category || !category.length) return { title: '', imageActive: '', imageInactive: '' }
    const categorieTranslate = translate(category)
    return {
      title: categorieTranslate,
      imageActive: Images[`${category}Active`],
      imageInactive: Images[`${category}Inactive`]
    }
  }

  render() {
    const { space, activeImageIndex, isModalOpen } = this.state
    const spaceCategorie = this.categoriesMapped(space ? space.category : null)
    console.log(space)

    return (
      <>
        {this.state.loading && (
          <AnimationLoading
            fullscreen={true}
            loading={this.state.loading}
          />
        )}

        {!this.state.loading && space ? (
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
              <View>
                <PlaceTitle>{space.name}</PlaceTitle>
                {space.adress && <PlaceText marginBottom={'20px'}>
                  {`${space.adress}, ${space.city}, ${space.state}, ${translate(space.country)}`}
                </PlaceText>}
              </View>
              <PlaceDivider marginBottom={'15px'}/>
              
              <RowContainer marginBottom={'15px'} container={true}>
                <View style={{ flex: 1 }}>
                  <PlaceText
                    fontSize={'22px'}
                    fontFamily={'Nunito Bold'}
                    fontColor={Colors.labelGray}
                  >
                    {spaceCategorie.title}
                  </PlaceText>
                  
                  <PlaceText
                    fontSize={'16px'}
                    fontFamily={'Nunito Semi Bold'}
                    marginBottom={'10px'}
                    marginTop={'-5px'}
                  >
                    {`${translate('owner')} ${space.User.name}`}
                  </PlaceText>

                  <PlaceText
                    fontSize={'15px'}
                  >
                    {`${translate('capacity')} ${space.capacity} ${translate('people')}`}
                  </PlaceText>

                </View>
                
                <TouchableView
                  activeOpacity={0.8}
                  alignItems={'center'}
                >
                  {space.User.avatar ? (
                    <ProfileImage source={{ uri: space.User.avatar.url }}/>
                  ) : (
                    <ProfileImage source={Images.image_background}/>
                  )}
                </TouchableView>
              </RowContainer>
              <PlaceDivider marginBottom={'25px'}/>

              <BetterReadMore
                numberOfLines={3}
              >
                <PlaceText
                  fontColor={Colors.text}
                  fontSize={'15px'}
                >
                  {space.description}
                </PlaceText>
              </BetterReadMore>
              <PlaceDivider marginTop={'25px'} marginBottom={'15px'}/>

            </Container>
          </>
        ) : (
          <Feedback feedbackType={'error'}/>
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
