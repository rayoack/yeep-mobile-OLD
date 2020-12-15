import React, { Component } from 'react'
import { StatusBar, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { Creators as manageAccountActions } from '../../../Stores/reducers/manageAccountReducer'

import { Images, Colors } from 'App/Theme'
import { translate } from '../../../Locales'

import {
  BackButton,
  CardRegisterStep
} from '../../../Components'

import {
  Container,
  BackButtonContainer,
  AccountTitle,
  HeaderContainer
} from './styles'
class EditPFAccountScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      steps: [
        { title: translate('firstPFAccountStepTitle'), text: '' },
        { title: translate('secondPFAccountStepTitle'), text: '' },
        { title: translate('bankAccountStepTitle'), text: '' },
        { title: translate('digitalAccountStepTitle'), text: '' },
        { title: translate('documentAccountStepTitle'), text: '' },
      ],
      loading: false,
    }
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.setAccountFormData()
  }

  handleBackButton = () => {
    this.props.navigation.goBack()
    return true;
  }

  setAccountFormData = async () => {
    let account = this.props.navigation.getParam('account')
    
    if(account && account.id) {
      
      if(account.BankAccount && account.BankAccount.id) {
        await this.props.setBankForm(account.BankAccount)
        delete account.BankAccount
      }
      
      if(account.JunoAccount && account.JunoAccount.id) {
        await this.props.setJunoForm(account.JunoAccount)
        delete account.JunoAccount
      }

      this.props.setAccountFormData(account)
    }

    return null
  }

  navigateToStep = (activeStep) => {
    const { account } = this.props

    if(account.register_step >= activeStep ||
      account.register_step + 1 == activeStep) {
        return this.props.navigation.push('RegisterAccountsSteps', {
          activeStep
        })

      } else {
        return
      }
  }

  render() {
    const { steps } = this.state
    const { account } = this.props

    return (
      <Container>
        <StatusBar translucent={false} backgroundColor="#000" hidden={false}/>

        <HeaderContainer>
          <BackButtonContainer
            onPress={() => this.props.navigation.goBack()}>
            <BackButton color={Colors.white} size={20}/>
          </BackButtonContainer>

          <AccountTitle>{account.legal_representative_name}</AccountTitle>
        </HeaderContainer>

        {steps.map((step, index) => (
          <CardRegisterStep
            title={step.title}
            text={step.text}
            completed={account.register_step > index ? true : false}
            final={(steps.length - 1) == index}
            onPress={account.register_step >= index ? () => this.navigateToStep(index) : () => null}
          />
        ))}

      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.manageAccountReducer.account
})

export default connect(
  mapStateToProps,
  { ...manageAccountActions }
)(EditPFAccountScreen)
