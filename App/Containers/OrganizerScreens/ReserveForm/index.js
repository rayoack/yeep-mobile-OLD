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
      event: '',
      space: '',
      reserve: '',
      message: '',
      reserveState: 'creation'
    }
  }

  componentDidMount = () => {
    // this.setReserveForm()
  }

  // setReserveForm = () => {

  // }

  setMessage = (message) => this.setState({ message })

  render() {
    const { reserveState, message, event, space } = this.state

    return (
      <Container>
        <Text> textInComponent </Text>

        {reserveState == 'creation'}
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
      </Container>
    )
  }
}

export default ReserveForm
