import React from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux'
import { Images } from 'App/Theme'
import { translate } from '../../../Locales'
import api from '../../../Services/api'

import {
  Slide,
  SlideTitle,
  SlideDescription,
  SlideImage
} from './styles'

const organizerSlides = [
  {
    key: 1,
    title: translate('organizerStepOnetitle'),
    text: translate('organizerStepOneDescription'),
    image: Images.organizerStepOne,
    backgroundColor: '#8965A3',
  },
  {
    key: 2,
    title: translate('organizerStepTwotitle'),
    text: translate('organizerStepTwoDescription'),
    image: Images.organizerStepTwo,
    backgroundColor: '#B0649E',
  },
  {
    key: 3,
    title: translate('organizerStepThreetitle'),
    text: translate('organizerStepThreeDescription'),
    image: Images.organizerStepThree,
    backgroundColor: '#836ABA',
  },
  {
    key: 4,
    title: translate('organizerStepFourtitle'),
    text: translate('organizerStepFourDescription'),
    image: Images.organizerStepFour,
    backgroundColor: '#AF6ABA',
  },
  {
    key: 5,
    title: translate('organizerStepFivetitle'),
    text: translate('organizerStepFiveDescription'),
    image: Images.organizerStepFive,
    backgroundColor: '#6764B0',
  }
];

class SuccessRegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showRealApp: false
    }
  }

  _renderItem = ({ item }) => {
    return (
      <Slide color={item.backgroundColor}>
        <SlideTitle>{item.title}</SlideTitle>
        <SlideImage source={item.image} />
        <SlideDescription>{item.text}</SlideDescription>
      </Slide>
    );
  }

  _onDone = async () => {

    try {
      const { data } = await api.put('/users', { new_user: false }, {
        authorization: `Bearer ${this.props.user.token}`
      })

      switch (this.props.user.role) {
        case 'organizer':
          return this.props.navigation.navigate('MyEventsScreen')
        case 'owner':
          return this.props.navigation.navigate('MyPlacesScreen')
        default:
          return this.props.navigation.navigate('AccessScreen')
      }
    } catch (error) {
      console.log({error})
    }

  }

  setSlides = () => {
    const { user } = this.props
    let slides = []

    if(user.role == 'organizer') {
      slides = organizerSlides
    }

    return slides
  }

  render() {

    const slides = this.setSlides()

    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        data={slides}
        onDone={this._onDone}
        doneLabel={translate('done')}
        nextLabel={translate('next')}
      />
    ) 
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(
  mapStateToProps, {}
)(SuccessRegisterScreen)