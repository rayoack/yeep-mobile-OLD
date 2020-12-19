import React, { PureComponent } from 'react'
import { View, Text, BackHandler, Dimensions, TouchableOpacity, StatusBar, Image } from 'react-native'

// import { MAPBOX_KEY } from 'react-native-dotenv'
import MapboxGL from '@react-native-mapbox-gl/maps'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Carousel, { Pagination } from 'react-native-snap-carousel'

import api from '../../../Services/api'
import { translate, toNumber } from '../../../Locales'
import { getCurrencySymbol } from '../../../Services/currenciesHelpers'
import { Images, Colors } from 'App/Theme'

import { Creators as ManagerReserveActions } from '../../../Stores/reducers/manageReserveReducer'

import {
  CarrouselFullScreen,
  AnimationLoading,
  BackButton,
  Feedback,
  BetterReadMore,
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
  ProfileImage,
  ViewMoreButton,
  StyledCollapsibleList,
  ScrollContainer,
  FooterContainer,
  CheckButton
} from './styles'

class PlaceDetailsScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      space: null,
      feedbackType: '',
      activeImageIndex: 0,
      isModalOpen: false,
      amenitiesButtonText: translate('viewMoreAmenities'),
      restrictionsButtonText: translate('viewMoreRestrictions'),
    }
    this.sheetRef = React.createRef();
  }

  componentDidMount() {
    // MapboxGL.setAccessToken(MAPBOX_KEY)
    // MapboxGL.setConnected(true)
    this.fetchSpaceDetails()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  fetchSpaceDetails = async () => {
    const id = this.props.navigation.getParam('space_id', null)

    this.setState({ loading: true })

    try {
      const { data } = await api.get(`/space/${id}`, {}, {
        authorization: `Bearer ${this.props.user.token}`
      })

      const spaceCategorie = this.categoriesMapped(data ? data.category : null)
      const spaceFeatures = this.featuresMapped(data ? data.features : null)
      const spaceRestrictions = this.restrictionsMapped(data ? data.restrictions : null)

      this.setState({
        space: {
          ...data,
          spaceCategorie,
          spaceFeatures,
          spaceRestrictions
        },
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

  featuresMapped = (features) => {
    if(!features || !features.length) return []
    let featuresArr = features.split(",")
    
    featuresArr = featuresArr.map(feature => {
      const featureTranslate = translate(feature)
      return {
        title: featureTranslate,
        icon: Images[`${feature}`],
      }
    })

    return featuresArr
  }

  restrictionsMapped = (restrictions) => {
    if(!restrictions || !restrictions.length) return []
    let restrictionsArr = restrictions.split(",")
    
    restrictionsArr = restrictionsArr.map(restriction => {
      const restrictionTranslate = translate(restriction)
      return {
        title: restrictionTranslate,
        icon: Images[`${restriction}`],
      }
    })

    return restrictionsArr
  }

  navigateToReserveForm = () => {
    if(this.state.space) {
      this.props.clearReserveForm()
      this.props.setSpaceOfReserve(this.state.space)
      this.props.setReserveSpaceId(this.state.space.id)

      this.props.navigation.push('ReserveForm')
    }

  }

  navigateToEventsSelectScreen = () => {
    this.props.clearReserveForm()

    if(this.state.space) {
      this.props.navigation.push('MyEventsSelectScreen', {
        space: this.state.space
      })
    }
  }

  renderContent = () => (
    <>
      <View
          style={{
              backgroundColor: Colors.white,
              padding: 16,
              height: 300,
          }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ width: 60, height: 6, marginBottom: 30 }} source={Images.push_rectangle}/>
          
          <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Nunito Semi Bold', marginBottom: 30, color: Colors.labelGray }}>
            {translate('spaceBottomModalTitle')}
          </Text>
      
          <TouchableOpacity
            onPressOut={this.navigateToEventsSelectScreen}
            style={{
                height: 45,
                width: 200,
                marginBottom: 20,
                borderRadius: 10,
                backgroundColor: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center'
            }}
          >
            <Text style={{ color: Colors.white }}>{translate('yesKey')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={this.navigateToReserveForm}
            style={{
                height: 45,
                width: 200,
                borderRadius: 10,
                backgroundColor: Colors.terciary,
                alignItems: 'center',
                justifyContent: 'center'
            }}
          >
            <Text style={{ color: Colors.white }}>{translate('noKey')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );


  setButtonAmenitiesText = (text) => this.setState({ amenitiesButtonText: text })
  setButtonRestrictionsText = (text) => this.setState({ restrictionsButtonText: text })

  render() {
    const { space, activeImageIndex, isModalOpen, amenitiesButtonText, restrictionsButtonText } = this.state

    return (
      <>
        {this.state.loading ? (
          <AnimationLoading
            fullscreen={true}
            loading={this.state.loading}
          />
        ) : null}

        {!this.state.loading && space ? (
          <>

            <ScrollContainer>
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
                            resizeMode={FastImage.resizeMode.cover}
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
                      {space.spaceCategorie.title}
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
                
                {space.description ? (
                  <>
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
                  </>
                ) : null}
                
                {space.spaceFeatures.length ? (
                  <>
                    <PlaceText
                      fontSize={'22px'}
                      fontFamily={'Nunito Bold'}
                      fontColor={Colors.labelGray}
                      marginBottom={'15px'}
                    >
                      {translate('amenitiesTitle')}
                    </PlaceText>

                    <StyledCollapsibleList
                      numberOfVisibleItems={2}
                      onToggle={collapsed =>
                        collapsed
                          ? this.setButtonAmenitiesText(translate('viewLessAmenities'))
                          : this.setButtonAmenitiesText(translate('viewMoreAmenities'))
                      }
                      buttonContent={
                        <ViewMoreButton>
                          <PlaceText
                            fontColor={Colors.secondary}
                            fontFamily={'Nunito Bold'}
                            fontSize={'15px'}
                          >
                            {amenitiesButtonText}
                          </PlaceText>
                        </ViewMoreButton>
                      }
                    >
                      {space.spaceFeatures.map((feature, index) => (
                        <RowContainer marginBottom={'15px'} key={index} container={true}>
                          <IconTitle>{feature.title}</IconTitle>

                          <IconImage source={feature.icon}/>
                        </RowContainer>
                      ))}
                    </StyledCollapsibleList>
                    <PlaceDivider marginTop={'25px'} marginBottom={'15px'}/>

                  </>
                ) : null}
                
                {space.spaceRestrictions.length ? (
                  <>
                    <PlaceText
                      fontSize={'22px'}
                      fontFamily={'Nunito Bold'}
                      fontColor={Colors.labelGray}
                      marginBottom={'15px'}
                    >
                      {translate('restrictionsTitle')}
                    </PlaceText>

                    <StyledCollapsibleList
                      numberOfVisibleItems={2}
                      onToggle={collapsed =>
                        collapsed
                          ? this.setButtonRestrictionsText(translate('viewLessRestrictions'))
                          : this.setButtonRestrictionsText(translate('viewMoreRestrictions'))
                      }
                      buttonContent={
                        <ViewMoreButton>
                          <PlaceText
                            fontColor={Colors.secondary}
                            fontFamily={'Nunito Bold'}
                            fontSize={'15px'}
                          >
                            {restrictionsButtonText}
                          </PlaceText>
                        </ViewMoreButton>
                      }
                    >
                      {space.spaceRestrictions.map((restriction, index) => (
                        <RowContainer marginBottom={'15px'} key={index} container={true}>
                          <IconTitle>{restriction.title}</IconTitle>

                          <IconImage source={restriction.icon}/>
                        </RowContainer>
                      ))}
                    </StyledCollapsibleList>
                    <PlaceDivider marginTop={'100px'} marginBottom={'15px'}/>

                  </>
                ) : null}

              </Container>
            </ScrollContainer>

            <FooterContainer>
              <PlaceText
                fontColor={Colors.labelBlack}
                fontFamily={'Nunito Bold'}
                fontSize={'15px'}
              >
                {`${getCurrencySymbol(space.monetary_unit)}${toNumber(space.price)} / ${translate(space.charge_type)}`}
              </PlaceText>

              <CheckButton
                activeOpacity={0.8}
                onPress={() => this.navigateToEventsSelectScreen()}
              >
                <PlaceText
                  fontColor={Colors.white}
                  fontFamily={'Nunito Bold'}
                  fontSize={'12px'}
                  textAlign={'center'}
                >
                  {translate('checkAvailability')}
                </PlaceText>
              </CheckButton>
              
            </FooterContainer>
          </>
        ) : (
          <>
            {this.state.feedbackType == 'error' ? (
              <Feedback feedbackType={'error'}/>
            ) : null}
          </>
        )}
        
        <BottomSheet
          ref={this.sheetRef}
          snapPoints={[350, 0]}
          borderRadius={30}
          initialSnap={0}
          renderContent={this.renderContent}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { ...ManagerReserveActions })(PlaceDetailsScreen)
