import React from 'react'
import { BackHandler, Platform, View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image'

import { Creators as ManageUserActions } from '../../../Stores/reducers/manageUserReducer'

import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import { translate } from '../../../Locales'
import {
  Container,
  SelectorTitleContainer,
  SelectorTitle,
  RoleContainer,
  RoleImage,
  RoleTextContainer,
  RoleTitle,
  RoleDescription
} from './styles'

class RoleSelectorScreen extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate('AccessScreen');
    return true;
  }

  scrollInterpolator = (index, carouselProps) => {
      const range = [2, 1, 0, -1];
      const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
      const outputRange = range;

      return { inputRange, outputRange };
  }

  animatedStyles = (index, animatedValue, carouselProps) => {
      const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
      const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

      return {
          zIndex: carouselProps.data.length - index,
          opacity: animatedValue.interpolate({
              inputRange: [-1, 0, 1, 2],
              outputRange: [0.75, 1, 0.6, 0.4]
          }),
          transform: [{
              rotate: animatedValue.interpolate({
                  inputRange: [-1, 0, 1, 2],
                  outputRange: ['0deg', '0deg', '5deg', '8deg'],
                  extrapolate: 'clamp'
              })
          }, {
              scale: animatedValue.interpolate({
                  inputRange: [-1, 0, 1, 2],
                  outputRange: [0.96, 1, 0.85, 0.7]
              })
          }, {
              [translateProp]: animatedValue.interpolate({
                  inputRange: [-1, 0, 1, 2],
                  outputRange: [
                      0,
                      0,
                      -sizeRef + 30,
                      -sizeRef * 2 + 45
                  ],
                  extrapolate: 'clamp'
              })
          }]
      };
  }

  setUserRolerAndNavigate = (role) => {
    this.props.setRole(role)
    this.props.navigation.navigate('RegisterScreen')
  }

  _renderItem = ({item, index}) => {
    return (
      <RoleContainer
        key={index}
        onPress={() => this.setUserRolerAndNavigate(item)}
        activeOpacity={0.8}
      >
        <RoleImage
          source={Images[item]}
        />

        <RoleTextContainer>
          <RoleTitle>{translate(`roleTitle${item}`)}</RoleTitle>

          <RoleDescription>{translate(`roleDescription${item}`)}</RoleDescription>
        </RoleTextContainer>
      </RoleContainer>
    )
  }

  render() {
    const roles = ['organizer', 'owner', 'service_provider']
    const sliderWidth = Dimensions.get('window').width

    return (
      <Container>
        <SelectorTitleContainer>
          <SelectorTitle>{translate('roleScreenTitle')}</SelectorTitle>
        </SelectorTitleContainer>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {roles.map((role, index) => (
            <RoleContainer
              key={index}
              onPress={() => role !== 'service_provider' ? this.setUserRolerAndNavigate(role) : null}
              onLongPress={() => null}
              activeOpacity={0.8}
              role={role}
            >
              <RoleImage
                source={Images[role]}
              />
      
              <RoleTextContainer>
                {role !== 'service_provider' ? (
                  <RoleTitle>{translate(`roleTitle${role}`)}</RoleTitle>
                  ) : (
                    <RoleTitle>{translate('serviceProviderComingSoon')}</RoleTitle>
                )}
      
                <RoleDescription>{translate(`roleDescription${role}`)}</RoleDescription>
              </RoleTextContainer>
            </RoleContainer>
          ))}
        </View>

        {/* <Carousel
          ref={(c) => { this._carousel = c }}
          data={roles}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={300}
          scrollInterpolator={this.scrollInterpolator}
          slideInterpolatedStyle={this.animatedStyles}
        /> */}
      </Container>
    )
  }

}

const mapStateToProps = (state) => ({
})

export default connect(
  mapStateToProps, {
    ...ManageUserActions
  }
)(RoleSelectorScreen)
