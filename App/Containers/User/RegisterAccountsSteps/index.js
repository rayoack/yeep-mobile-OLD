import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import { ProgressSteps, ProgressStep } from '../../../Services/ProgressSteps';
import api from '../../../Services/api'
import { translate } from '../../../Locales'
import { Images, Colors } from 'App/Theme'

import { Container } from './styles'

import { Creators as ManagerAccountActions } from '../../../Stores/reducers/manageAccountReducer'

import {
  SavingLoading,
  CustomToast,
  HeaderWithBackButton,
  FirstPFAccountScreen,
  AdressAccountStep,
  BankAccountStep,
  DigitalAccountStep,
  DocumentsAccountStep
} from '../../../Components'

export class RegisterAccountsSteps extends Component {
    constructor(props) {
      super(props)
      this.state = {
        keyboardIsOpen: false,
        loading: false,
        onNextFunc: () => null,
        stepError: false,
        activeStep: 0,
        activeImageIndex: 0,
        isTimePickerVisible: false,
        hourType: 'start_hour',
        toastText: '',
        showToast: false,
      }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  
        const activeStep = this.props.navigation.getParam('activeStep', 0)
        this.setState({ activeStep })
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
  
    _keyboardDidShow = () => {
        return this.setState({ keyboardIsOpen: true })
    }
  
    _keyboardDidHide = () => {
        return this.setState({ keyboardIsOpen: false })
    }

    setShowToast = (text) => {
        this.setState({ toastText: text, showToast: true })
    
        this.interval = setInterval(() => {
          this.setState({ showToast: false })
          clearInterval(this.interval)
        }, 3000);
      }

    // SAVE ACCOUNT CHANGES
    saveOrUpdateAccount = async (oldStepIndex, actualStep = 'account') => {
        const { account, bank, JunoAccount } = this.props

        if(JunoAccount.id) {
            this.setState({ toastText: translate('notUpdateAccountAlert'), showToast: true })

            setTimeout(() => {
                this.setState({ showToast: false, toastText: '' })
            }, 3000);

            return
        }

        this.setState({ loading: true })

        try {
            let updateAccount

            if(actualStep === 'bank' && bank && !bank.id) {
    
                const { data } = await api.post('/bank-accounts', bank, {
                    authorization: `Bearer ${this.props.user.token}`
                })

            } else if (actualStep === 'bank' && bank && bank.id) {
                const { data } = await api.put(`/bank-accounts/${bank.id}`, bank, {
                    authorization: `Bearer ${this.props.user.token}`
                })
            }

            if(actualStep === 'digitalAccount') {
                this.setState({ toastText: translate('errorOnCreateDigitalAccount') })
    
                const { data } = await api.post('/payments/digital-account', { accountId: account.id }, {
                    authorization: `Bearer ${this.props.user.token}`
                })

                if(data && data.juno_id) {
                    this.props.setJunoForm(data)
                }

            } else {
                // CRIAR ATUALIZAÇÃO DE CONTAS DIGITAIS
            }

            if(account.id) {
                let formData = { ...account }

                const { data } = await api.put(`/accounts/${account.id}`, formData, {
                    authorization: `Bearer ${this.props.user.token}`
                })
                
                updateAccount = data

            } else {

                const { data } = await api.post('/accounts', account, {
                    authorization: `Bearer ${this.props.user.token}`
                })

                updateAccount = data
                this.props.setAccountId(data.id)
            }

            this.setState({ loading: false })

            this.goToNextStep()

            // if(account.register_step === 3) {
            //     // ALTERAR Se for a primeira vez levar para a tela de sucesso
            //     if(oldStep < account.register_step) return

            //     this.props.navigation.goBack()
            // } 

        } catch (error) {
            console.log({error})
            this.setState({ loading: false, stepError: true })

            if(this.state.toastText.length) { 
                this.setState({ showToast: true })

                setTimeout(() => {
                    this.setState({ showToast: false, toastText: '' })
                }, 3000);
            }
        }
    }
    
    // STEPS FUNCTIONS
    goToNextStep = () => {
        this.setState(prevState => ({ activeStep: prevState.activeStep + 1 }))
    }

    goBackStep = () => {
        this.setState(prevState => ({ activeStep: prevState.activeStep - 1 }))
    }

    setSaveNextStepForm = (func) => {
        this.setState({ onNextFunc: func })
    }

    setStepErrors = (errors) => {
        const hasError = Object.entries(errors).length > 0
        this.setState({ stepError: hasError })
    }

    nextButtonStyle = {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
    
    nextButtonTextStyle = {
        color: Colors.white,
        fontSize: 15,
        fontFamily: 'Nunito Regular'
    }

    render() {
        const {
            onNextFunc,
            stepError,
            loading,
            activeStep,
            toastText,
            showToast
        } = this.state
      
          const { account } = this.props

        return (
            <>
                <SavingLoading loading={loading} />
                
                <CustomToast
                    show={showToast} 
                    text={toastText} 
                    duration={2000}
                    positionValue={50}
                />

                <Container>
                    <HeaderWithBackButton navigation={this.props.navigation}/>
                    <ProgressSteps
                        activeStep={activeStep}
                        labelColor={Colors.secondary}
                        disabledStepIconColor={Colors.secondary}
                        labelFontFamily={'Nunito Regular'}
                        progressBarColor={Colors.secondary}
                        activeStepIconBorderColor={Colors.primary}
                        activeLabelColor={Colors.primary}
                        activeStepNumColor={Colors.primary}
                        completedStepIconColor={Colors.primary}
                        completedProgressBarColor={Colors.primary}
                    >
                        {/* STEP 1 */}
                        <ProgressStep
                            onNext={onNextFunc}
                            onPrevious={this.goBackStep}
                            label={account.account_type === 'PJ' ? translate('firstPJAccountStepTitle') : translate('firstPFAccountStepTitle')}
                            errors={stepError}
                            nextBtnText={translate('nextBtnText')}
                            nextBtnStyle={this.nextButtonStyle}
                            nextBtnTextStyle={this.nextButtonTextStyle}
                        >
                            {account.account_type === 'PF' ? (
                                <FirstPFAccountScreen
                                    setSaveNextStepForm={this.setSaveNextStepForm}
                                    setStepErrors={this.setStepErrors}
                                    saveOrUpdateAccount={this.saveOrUpdateAccount}
                                />
                            ) : null}
                        </ProgressStep>

                        {/* ADRESS STEP */}
                        <ProgressStep
                            onNext={onNextFunc}
                            onPrevious={this.goBackStep}
                            label={translate('secondPFAccountStepTitle')}
                            errors={stepError}
                            nextBtnText={translate('nextBtnText')}
                            nextBtnStyle={this.nextButtonStyle}
                            nextBtnTextStyle={this.nextButtonTextStyle}
                        >
                            <AdressAccountStep
                                setSaveNextStepForm={this.setSaveNextStepForm}
                                setStepErrors={this.setStepErrors}
                                saveOrUpdateAccount={this.saveOrUpdateAccount}
                            />
                        </ProgressStep>

                        {/* BANK STEP */}
                        <ProgressStep
                            onNext={onNextFunc}
                            onPrevious={this.goBackStep}
                            label={translate('bankAccountStepTitle')}
                            errors={stepError}
                            nextBtnText={translate('nextBtnText')}
                            nextBtnStyle={this.nextButtonStyle}
                            nextBtnTextStyle={this.nextButtonTextStyle}
                        >
                            <BankAccountStep
                                setSaveNextStepForm={this.setSaveNextStepForm}
                                setStepErrors={this.setStepErrors}
                                saveOrUpdateAccount={this.saveOrUpdateAccount}
                                navigation={this.props.navigation}
                            />
                        </ProgressStep>

                        {/* DIGITAL ACCOUNT STEP */}
                        <ProgressStep
                            onNext={onNextFunc}
                            onPrevious={this.goBackStep}
                            label={translate('digitalAccountStepTitle')}
                            errors={stepError}
                            nextBtnText={translate('nextBtnText')}
                            nextBtnStyle={this.nextButtonStyle}
                            nextBtnTextStyle={this.nextButtonTextStyle}
                        >
                            <DigitalAccountStep
                                setSaveNextStepForm={this.setSaveNextStepForm}
                                setStepErrors={this.setStepErrors}
                                saveOrUpdateAccount={this.saveOrUpdateAccount}
                            />
                        </ProgressStep>

                        {/* DOCUMENTS STEP */}
                        <ProgressStep
                            onNext={onNextFunc}
                            onPrevious={this.goBackStep}
                            label={translate('documentAccountStepTitle')}
                            errors={stepError}
                            nextBtnText={translate('nextBtnText')}
                            nextBtnStyle={this.nextButtonStyle}
                            nextBtnTextStyle={this.nextButtonTextStyle}
                        >
                            <DocumentsAccountStep
                                setSaveNextStepForm={this.setSaveNextStepForm}
                                setStepErrors={this.setStepErrors}
                                saveOrUpdateAccount={this.saveOrUpdateAccount}
                                navigation={this.props.navigation}
                            />
                        </ProgressStep>
                    </ProgressSteps>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    account: state.manageAccountReducer.account,
    JunoAccount: state.manageAccountReducer.JunoAccount,
    bank: state.manageAccountReducer.bank,
    user: state.auth.user
})

export default connect(mapStateToProps, {
    ...ManagerAccountActions
})(RegisterAccountsSteps)
