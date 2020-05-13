import React, { Component } from 'react'
import { StatusBar, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { Creators as manageEventActions } from '../../../Stores/reducers/manageEventReducer'

import { Images, Colors } from 'App/Theme'
import { translate } from '../../../Locales'

import {
  BackButton,
  CardRegisterStep
} from '../../../Components'

import {
  Container,
  BackButtonContainer,
  EventTitle,
  HeaderContainer
} from './styles'
class EditEventScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      steps: [
        { title: translate('firstEditEventStepTitle'), text: translate('firstEditEventStepText') },
        { title: translate('secondEditEventStepTitle'), text: translate('secondEditEventStepText') },
        { title: translate('thirdEditEventStepTitle'), text: translate('thirdEditEventStepText') },
        { title: translate('fourthEditEventStepTitle'), text: translate('fourthEditEventStepText') },
        { title: translate('fifthEditEventStepTitle'), text: translate('fifthEditEventStepText') },
        { title: translate('sixthEditEventStepTitle'), text: translate('sixthEditEventStepText') },
        { title: translate('seventhEditEventStepTitle'), text: translate('seventhEditEventStepText') },
        { title: translate('eighthEditEventStepTitle'), text: translate('eighthEditEventStepText') },
      ],
      loading: false,
    }
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.setEventFormData()
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null)
    return true;
  }

  setEventFormData = () => {
    const event = this.props.navigation.getParam('event')
    
    if(event && event.id) {
      return this.props.setEventFormData(event)
    }

    return null
  }

  render() {
    const { steps } = this.state
    const { event } = this.props

    return (
      <Container>
        <StatusBar translucent={false} backgroundColor="#000" hidden={false}/>

        <HeaderContainer>
          <BackButtonContainer
            onPress={() => this.props.navigation.goBack(null)}>
            <BackButton color={Colors.white} size={30}/>
          </BackButtonContainer>

          <EventTitle>{event.title}</EventTitle>
        </HeaderContainer>

        {steps.map((step, index) => (
          <CardRegisterStep
            title={step.title}
            text={step.text}
            completed={(event.register_step >= index && event.register_step != 0) ? true : false}
            final={(steps.length - 1) == index}
          />
        ))}

      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  event: state.manageEventReducer.event
})

export default connect(
  mapStateToProps,
  { ...manageEventActions }
)(EditEventScreen)
