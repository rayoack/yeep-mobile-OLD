import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';

import CustomInput from '../CustomInput'
import InputButton from '../InputButton'
import CustomPicker from '../CustomPicker'
import { translate } from '../../Locales'
import { Creators as ManagerAccountActions } from '../../Stores/reducers/manageAccountReducer'

import { Container } from './styles';

const BankAccountStep = ({
    account,
    bank,
    setSaveNextStepForm,
    setStepErrors,
    saveOrUpdateAccount,
    user,
    navigation
}) => {
    
    const { bank_number, agency_number, account_number, account_complement_number, account_type } = bank

    const navigateToBankList = (setFieldValue) => {
        navigation.push('BankList', {
            setFieldValue
        })
    }

    const saveBankAccountStep = (newData) => {
        console.log({newData})
        // newData.post_code = newData.post_code.replace(/[^A-Z0-9]/ig, '')
        // setPFAccountSecondStep(newData)
        // saveOrUpdateAccount(1)
    }

    const bankAccountTypes = [
        { title: '', value: '' },
        { title: translate('CHECKING'), value: 'CHECKING' },
        { title: translate('SAVINGS'), value: 'SAVINGS' }
    ]

    return (
        <Container contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}>
            <Formik
                    initialValues={{
                        bank_number: bank_number,
                        agency_number: agency_number,
                        account_number: account_number,
                        account_complement_number: account_complement_number,
                        account_type: account_type,
                    }}
                    onSubmit={values => saveBankAccountStep(values)}
                    validationSchema={
                        Yup.object().shape({
                            bank_number: Yup
                                .string()
                                .nullable()
                                .required(translate('bankNumberIsRequired')),
                            agency_number: Yup
                                .string()
                                .nullable()
                                .required(translate('agencyNumberRequired')),
                            account_number: Yup
                                .string()
                                .nullable()
                                .required(translate('accountNumberRequired')),
                            account_complement_number: Yup
                                .string()
                                .nullable()
                                .max(1, translate('accountComplementNumberMax')),
                            account_type: Yup
                                .string()
                                .nullable()
                                .required(translate('accountTypeRequired')),
                        })
                    }
                >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    setFieldTouched,
                    setFieldValue,
                    touched
                }) => {
                    setStepErrors(errors)
                    setSaveNextStepForm(handleSubmit)

                    return (
                        <>
                            <InputButton
                                label={translate('bankNumberLabel')}
                                iconSize={24}
                                value={bank_number}
                                navigateTolist={() => navigateToBankList(setFieldValue)}
                                marginLeft={'5px'}
                                error={touched.bank_number && errors.bank_number}
                                placeholder={translate('bankNumberPlaceholder')}
                                errorMessage={errors.bank_number}
                            />
                            
                            <CustomInput
                                label={translate('agencyNumberLabel')}
                                value={values.agency_number}
                                onChangeText={handleChange('agency_number')}
                                marginBottom={20}
                                error={touched.agency_number && errors.agency_number}
                                onBlur={() => setFieldTouched('agency_number')}
                                errorText={errors.agency_number}
                            />
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <CustomInput
                                    label={translate('accountNumberLabel')}
                                    value={values.account_number}
                                    labelSize={14}
                                    marginRight={10}
                                    keyboardType={'numeric'}
                                    error={touched.account_number && errors.account_number}
                                    onChangeText={handleChange('account_number')}
                                    onBlur={() => setFieldTouched('account_number')}
                                    marginBottom={20}
                                    width={'150px'}
                                    errorText={errors.account_number}
                                />

                                <CustomInput
                                    label={translate('accountComplementNumberLabel')}
                                    value={values.account_complement_number}
                                    keyboardType={'numeric'}
                                    labelSize={14}
                                    error={touched.account_complement_number && errors.account_complement_number}
                                    onChangeText={handleChange('account_complement_number')}
                                    onBlur={() => setFieldTouched('account_complement_number')}
                                    marginBottom={20}
                                    width={'150px'}
                                    errorText={errors.account_complement_number}
                                />
                            </View>

                            
                            <CustomPicker
                                actualValue={values.account_type}
                                values={bankAccountTypes}
                                onValueChange={value => {
                                    setFieldValue('account_type', value)
                                }}
                                label={translate('accountTypeLabel')}
                                marginBottom={30}
                                error={errors.account_type}
                                errorText={errors.account_type}
                                marginRight={10}
                            />
                        </>
                    )
                }}
            </Formik>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    account: state.manageAccountReducer.account,
    bank: state.manageAccountReducer.bank,
})
  
export default connect(
    mapStateToProps, {
    ...ManagerAccountActions
})(BankAccountStep)