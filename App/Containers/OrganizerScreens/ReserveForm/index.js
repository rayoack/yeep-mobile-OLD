import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { translate, toNumber } from '../../../Locales'
import currencies from '../../../Services/currencies.json'
import { Images, Colors } from '../../../Theme'

import {
  CustomInput
} from '../../../Components'

import {
  Container,
  PlaceDivider,
  StyledView,
  StyledText,
  StyledImage,
  StyledTextInput,
  PlaceDetailsContainer,
  PlaceInfosContainer
} from './styles'

export class ReserveForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      service_charge: '',
      quantity: '',
      reserve: null,
      space: null,
      event: null,
    }
  }

  componentDidMount = () => {
    this.setReserveForm()
  }

  setReserveForm = () => {

    const space = this.props.navigation.getParam('space', null)
    const event = this.props.navigation.getParam('event', null)

    let newReserve = {
      message: translate('reserveSpacesMessage'),
      dates: event.dates,
      amount: '',
      canceled_at: null,
      space_id: space.id,
      event_id: event.id,
      status: "waitingForApproval",
    }

    this.setState({
      reserve: newReserve,
      space,
      event
    })

    // space.charge_type == 'perDay' ?
    //   this.setAmountPerDay()
    //   : this.setAmountPerHour()
  
  }

  setAmountPerDay = () => {
    const { reserve, event, space } = this.state

    if(reserve && event && space) {
      let reserveCopy = { ...reserve }
  
      reserveCopy.amount = event.dates.length * space.price

      this.setState({ reserve: reserveCopy })
    }

  }

  setAmountPerHour = () => {
    const { reserve, event, space } = this.state

    if(reserve && event && space) {
      let reserveCopy = { ...reserve }
  
      reserveCopy.amount = event.dates.length * space.price

      this.setState({ reserve: reserveCopy })
    }

  }

  getCurrencySymbol = (actualCurrency) => {
    const symbol = currencies.filter(currency => {
      if(currency.value == actualCurrency) {
        return currency
      }
    })
    
    return symbol[0].symbol
  }

  setMessage = (message) => this.setState({ message })

  render() {
    const { reserve, message, event, space } = this.state
    console.log('space', space)
    return (
      <>
        {reserve ? (

          <Container>
            {/* SPACE DETAILS */}
            <PlaceDetailsContainer>
              {/* SPACE NAME */}
              <StyledView>
                <StyledText
                  fontSize={'30px'}
                  fontFamily={'Nunito Bold'}
                  fontColor={Colors.labelBlack}
                >
                  {space.name}
                </StyledText>
              </StyledView>

              {/* SPACE INFOS CONTAINER */}
              <PlaceInfosContainer>
                {/* SPACE LEFT INFOS */}
                <View style={{ flex: 1 }} >
                  <StyledView>
                    <StyledText
                      fontSize={'15px'}
                      fontFamily={'Nunito Semi Bold'}
                      fontColor={Colors.labelBlack}
                    >
                      {translate(space.category)}
                    </StyledText>

                    <StyledText
                      numberOfLines={2}
                    >
                      {`${this.getCurrencySymbol(space.monetary_unit)}${toNumber(space.price)} / ${translate(space.charge_type)}`}
                    </StyledText>
                  </StyledView>

                  <StyledText>{space.description}</StyledText>
                </View>

                {/* SPACE IMAGE */}
                <View style={{ flex: 1, alignItems: 'flex-end' }} >
                  {space.Images.length ? (
                    <StyledImage
                      borderRadius={10}
                      source={{ uri: space.Images[0].url }}
                    />
                  ) : (
                    <StyledImage
                      borderRadius={10}
                      source={Images.image_background}
                    />
                  )}
                </View>

              </PlaceInfosContainer>
            </PlaceDetailsContainer>
            <PlaceDivider marginBottom={'15px'}/>
            {/* SPACE DETAILS */}

            {/* <CustomInput
              label={translate('thirdEditEventStepTitle')}
              text={translate('thirdEditEventStepText')}
              placeholder={translate('eventDescriptionPlaceholder')}
              value={message}
              onChangeText={this.setMessage}
              marginBottom={20}
              // onBlur={() => setFieldTouched('description')}
              height={'300px'}
              multiline={true}
            /> */}
          </Container>
        ) : null}
      </>
    )
  }
}

export default ReserveForm
