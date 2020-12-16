import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import CustomInput from '../CustomInput'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { format, parseISO } from 'date-fns';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import InputButton from '../InputButton'
import { translate } from '../../Locales'

import { Creators as ManagerAccountActions } from '../../Stores/reducers/manageAccountReducer'

import {
    Container,
    StepTitle,
    StepDescription,
    AccountAlertContainer,
    AccountAlertText
} from './styles'

const FirstPFAccountScreen = ({
    account,
    setSaveNextStepForm,
    setStepErrors,
    setPFAccountFirstStep,
    saveOrUpdateAccount,
    setAccountUserId,
    JunoAccount,
    user
}) => {
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false)
    const [dateOfBirthFormated, setDateOfBirthFormated] = useState('')

    const { legal_representative_name, cpf_cnpj, date_of_birth, phone_number } = account

    if(date_of_birth && !dateOfBirthFormated) {
        setDateOfBirthFormated(date_of_birth)
    }
    
    const setPFAccountFirstStepFormdata = (newData) => {
        
        newData.cpf_cnpj = newData.cpf_cnpj.replace(/[^\w\s]/gi, '')
        newData.phone_number = newData.phone_number.replace(/[^A-Z0-9]/ig, '')

        setAccountUserId(user.id)
        setPFAccountFirstStep(newData)
    
        saveOrUpdateAccount(0)
    }

    const openTimePicker = () => {
        return setIsTimePickerVisible(true)
    }

    return (
        <Container contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}>
            {JunoAccount.id ? (
                <AccountAlertContainer>
                    <AccountAlertText>{translate('notUpdateAccountAlert')}</AccountAlertText>
                </AccountAlertContainer>
            ) : null}

            <StepTitle>{translate('firstPFAccountTitle')}</StepTitle>
            <StepDescription>{translate('firstPFAccountDescription')}</StepDescription>
            
            <Formik
                initialValues={{
                    legal_representative_name: legal_representative_name,
                    cpf_cnpj: cpf_cnpj,
                    date_of_birth: date_of_birth,
                    phone_number: phone_number,
                }}
                onSubmit={values => setPFAccountFirstStepFormdata(values)}
                validationSchema={
                    Yup.object().shape({
                        legal_representative_name: Yup
                            .string()
                            .nullable()
                            .required(translate('pfAccountNameRequired')),
                        cpf_cnpj: Yup
                            .string()
                            .min(14, translate('cpfMinMessage'))
                            .required(translate('cpfRequired')),
                        date_of_birth: Yup
                            .string()
                            .required(translate('dateOfBirthRequired')),
                        phone_number: Yup
                            .string()
                            .min(14, translate('phoneNumberMinMessage'))
                            .required(translate('phoneNumberRequired')),
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
                    <CustomInput
                        label={translate('pfAccountNameLabel')}
                        placeholder={translate('eventTitlePlaceholder')}
                        value={values.legal_representative_name}
                        onChangeText={handleChange('legal_representative_name')}
                        marginBottom={20}
                        error={touched.legal_representative_name && errors.legal_representative_name}
                        onBlur={() => setFieldTouched('legal_representative_name')}
                        errorText={errors.legal_representative_name}
                        editable={JunoAccount.id ? false : true}
                    />

                    <CustomInput
                        label={translate('cpfLabel')}
                        placeholder={translate('cpfNamePlaceholder')}
                        value={values.cpf_cnpj}
                        keyboardType={'numeric'}
                        error={touched.cpf_cnpj && errors.cpf_cnpj}
                        onChangeText={handleChange('cpf_cnpj')}
                        onBlur={() => setFieldTouched('cpf_cnpj')}
                        marginBottom={20}
                        errorText={errors.cpf_cnpj}
                        isMasked={true}
                        mask={"[000].[000].[000]-[00]"}
                        editable={JunoAccount.id ? false : true}
                    />

                    
                    <InputButton
                        label={translate('dateOfBirthLabel')}
                        iconSize={24}
                        value={dateOfBirthFormated}
                        navigateTolist={openTimePicker}
                        marginLeft={'5px'}
                        error={touched.date_of_birth && errors.date_of_birth}
                        placeholder={translate('dateOfBirthPlaceholder')}
                        errorMessage={errors.date_of_birth}
                        editable={JunoAccount.id ? false : true}
                    />

                    <CustomInput
                        label={translate('phoneNumberLabel')}
                        placeholder={translate('phoneNumberPlaceholder')}
                        value={values.phone_number}
                        keyboardType={'numeric'}
                        error={touched.phone_number && errors.phone_number}
                        onChangeText={handleChange('phone_number')}
                        onBlur={() => setFieldTouched('phone_number')}
                        marginBottom={20}
                        isMasked={true}
                        mask={"([00]) [00000]-[0000]"}
                        error={touched.phone_number && errors.phone_number}
                        errorText={errors.phone_number}
                        editable={JunoAccount.id ? false : true}
                    />
                    
                    {isTimePickerVisible ? (
                        <DateTimePicker
                            value={date_of_birth ? parseISO(date_of_birth) : new Date()}
                            onChange={value => {
                                const dayFormated = format(value.nativeEvent.timestamp, 'yyyy-MM-dd')
                                setFieldValue('date_of_birth', dayFormated)
                                setDateOfBirthFormated(dayFormated)
                                setIsTimePickerVisible(false)
                            }}
                            mode={"date"}
                        />
                    ) : null}
                </>
                )
            }}
            </Formik>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    account: state.manageAccountReducer.account,
    JunoAccount: state.manageAccountReducer.JunoAccount,
})
  
export default connect(
    mapStateToProps, {
    ...ManagerAccountActions
})(FirstPFAccountScreen)
