import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { translate } from '../../../Locales'

import {
  CustomInput
} from '../../../Components'

import {
  Container,
  StyledView,
  StyledText,
  StyledImage,
  StyledTextInput
} from './styles'

export class ReserveForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      service_charge: '',
      quantity: '',
      reserve: {},
      isCreation: false
    }
  }

  componentDidMount = () => {
    // this.setReserveForm()
  }

  setReserveForm = () => {
    const isCreation = this.props.navigation.getParam('isCreation', false)

    if(isCreation) {
      const space = this.props.navigation.getParam('space', null)
      const event = this.props.navigation.getParam('event', null)

      let newReserve = {
        message: "",
        dates: event.dates,
        amount: '',
        canceled_at: null,
        space_id: space.id,
        event_id: event.id,
        status: "waitingForApproval",
        Event: event,
        Space: space
      }

      this.setState({ reserve: newReserve })

    }
  }

  setAmount = () => {
    const { reserve } = this.state

    let reserveCopy = { ...reserve }


  }

  setMessage = (message) => this.setState({ message })

  render() {
    const { reserveState, message, event, space } = this.state

    return (
      <Container>
        <Text> textInComponent </Text>

        {reserveState == 'creation' ? (
          <CustomInput
            label={translate('thirdEditEventStepTitle')}
            text={translate('thirdEditEventStepText')}
            placeholder={translate('eventDescriptionPlaceholder')}
            value={message}
            onChangeText={this.setMessage}
            marginBottom={20}
            // onBlur={() => setFieldTouched('description')}
            height={'300px'}
            multiline={true}
          />
        ) : null}
      </Container>
    )
  }
}

export default ReserveForm
