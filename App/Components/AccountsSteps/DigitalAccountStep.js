import React from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import { translate } from '../../Locales'
import { Creators as ManagerAccountActions } from '../../Stores/reducers/manageAccountReducer'

import {
    Container,
    StepTitle,
    StepDescription,
    AccountDataSessionContainer,
    AccountDataSessionTitle,
    AccountDataContainer,
    AccountDataField,
    AccountDataFieldValue
} from './styles'

const DigitalAccountStep = ({
    setSaveNextStepForm,
    setStepErrors,
    saveOrUpdateAccount,
    account,
    bank
}) => {
  return (
    <Container contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}>
        <StepTitle>{translate('digitalAccountStepTitle')}</StepTitle>
        <StepDescription>{translate('digitalAccountStepDescription')}</StepDescription>

        {account.account_type === 'PF' ? (
            // ACCOUNT TYPE PF
            <AccountDataSessionContainer>
                <AccountDataSessionTitle>{translate('firstPFAccountTitle')}</AccountDataSessionTitle>
                <AccountDataContainer>
                    <AccountDataField>{`${translate('pfAccountNameLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{account.legal_representative_name}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('cpfLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{account.cpf_cnpj}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('dateOfBirthLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{account.date_of_birth}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('phoneNumberLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{account.phone_number}</AccountDataFieldValue>
                </AccountDataContainer>
            </AccountDataSessionContainer>
        ) : null}

            {/* ADRESS */}
            <AccountDataSessionContainer>
                <AccountDataSessionTitle>{translate('secondPFAccountStepTitle')}</AccountDataSessionTitle>
                <AccountDataContainer>
                    <AccountDataField>{`${translate('secondPFAccountStepTitle')}:`}</AccountDataField>
                    <AccountDataFieldValue>{account.adress}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('adressNumberLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{account.adress_number}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('complementLabelNotOptional')}:`}</AccountDataField>
                    <AccountDataFieldValue>{account.complement}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('country')}:`}</AccountDataField>
                    <AccountDataFieldValue>{translate(account.country)}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('state')}:`}</AccountDataField>
                    <AccountDataFieldValue>{account.state}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('city')}:`}</AccountDataField>
                    <AccountDataFieldValue>{account.city}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('postCodeLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{account.post_code}</AccountDataFieldValue>
                </AccountDataContainer>
            </AccountDataSessionContainer>
        
            {/* BANK */}
            <AccountDataSessionContainer>
                <AccountDataSessionTitle>{translate('bankAccountStepTitle')}</AccountDataSessionTitle>
                <AccountDataContainer>
                    <AccountDataField>{`${translate('bankNumberLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{bank.bank_number}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('agencyNumberLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{bank.agency_number}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('accountNumberLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{bank.account_number}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('accountComplementNumberLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{bank.account_complement_number}</AccountDataFieldValue>
                </AccountDataContainer>

                <AccountDataContainer>
                    <AccountDataField>{`${translate('accountTypeLabel')}:`}</AccountDataField>
                    <AccountDataFieldValue>{translate(bank.account_type)}</AccountDataFieldValue>
                </AccountDataContainer>
            </AccountDataSessionContainer>
    </Container>
  );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    account: state.manageAccountReducer.account,
    bank: state.manageAccountReducer.bank
})
  
export default connect(
    mapStateToProps, {
    ...ManagerAccountActions
})(DigitalAccountStep)
