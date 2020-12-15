import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../CustomInput'
import InputButton from '../InputButton'
import CustomPicker from '../CustomPicker'
import { translate } from '../../Locales'
import countriesList from '../../Services/countries.json'

import { Creators as ManagerAccountActions } from '../../Stores/reducers/manageAccountReducer'

import {
    Container,
    StepTitle
} from './styles'

const AdressAccountStep = ({
    account,
    setSaveNextStepForm,
    setStepErrors,
    setPFAccountSecondStep,
    saveOrUpdateAccount,
}) => {
    const { adress, country, state, city, adress_number, post_code, complement } = account

    const [countryStates, setCountryStates] = useState([])
    const [countries, setCountries] = useState([])

    const configureCountryStates = (countryName) => {
        const actualCountry = countriesList.filter(country => country.name == countryName)
        const states = actualCountry[0].states.map(state => {
            return {
                title: state.name,
                value: state.code
            }
        })

        setCountryStates(states)
    }

    const getCountries = () => {
        const countries = countriesList.map(country => {
            return {
                title: country.name.length ? translate(country.name) : '',
                value: country.name
            }
        })

        setCountries(countries)
    }

    useEffect(() => {
        configureCountryStates('')
        getCountries()
    }, [])
    
    const saveAdressAccountStep = (newData) => {
        newData.post_code = newData.post_code.replace(/[^A-Z0-9]/ig, '')
        setPFAccountSecondStep(newData)
        saveOrUpdateAccount(1)
    }

    return (
        <Container contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}>
            <StepTitle>{translate('adressAccountStepTitle')}</StepTitle>
            
            <Formik
                initialValues={{
                    adress: adress,
                    country: country,
                    state: state,
                    city: city,
                    adress_number: adress_number,
                    post_code: post_code,
                    complement: complement,
                }}
                onSubmit={values => saveAdressAccountStep(values)}
                validationSchema={
                    Yup.object().shape({
                        adress: Yup
                            .string()
                            .nullable()
                            .required(translate('adressRequired')),
                        country: Yup
                            .string()
                            .required(translate('countryRequired')),
                        state: Yup
                            .string()
                            .required(translate('stateRequired')),
                        city: Yup
                            .string()
                            .required(translate('cityRequired')),
                        adress_number: Yup
                            .string(),
                        post_code: Yup
                            .string()
                            .min(9, translate('postCodeMinMessage'))
                            .required(translate('postCodeRequired')),
                        complement: Yup
                            .string()
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
                            label={translate('secondPFAccountStepTitle')}
                            placeholder={translate('yourAdress')}
                            value={values.adress}
                            onChangeText={handleChange('adress')}
                            marginBottom={20}
                            error={touched.adress && errors.adress}
                            onBlur={() => setFieldTouched('adress')}
                            errorText={errors.adress}
                        />


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CustomPicker
                                actualValue={values.country}
                                values={countries}
                                onValueChange={value => {
                                    configureCountryStates(value)
                                    setFieldValue('country', value)
                                }}
                                label={translate('yourCountry')}
                                marginBottom={30}
                                error={errors.country}
                                width={'150px'}
                                errorText={errors.country}
                                marginRight={10}
                            />

                            <CustomPicker
                                actualValue={values.state}
                                values={countryStates}
                                onValueChange={handleChange('state')}
                                label={translate('yourState')}
                                marginBottom={30}
                                error={errors.state}
                                width={'150px'}
                                errorText={errors.state}
                            />
                        </View>

                        <CustomInput
                            label={translate('city')}
                            placeholder={translate('yourCity')}
                            value={values.city}
                            onChangeText={handleChange('city')}
                            marginBottom={20}
                            error={touched.city && errors.city}
                            onBlur={() => setFieldTouched('city')}
                            errorText={errors.city}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CustomInput
                                label={translate('adressNumberLabel')}
                                placeholder={translate('adressNumberPlaceholder')}
                                value={values.adress_number}
                                labelSize={14}
                                marginRight={10}
                                keyboardType={'numeric'}
                                error={touched.adress_number && errors.adress_number}
                                onChangeText={handleChange('adress_number')}
                                onBlur={() => setFieldTouched('adress_number')}
                                marginBottom={20}
                                width={'150px'}
                                errorText={errors.adress_number}
                            />

                            <CustomInput
                                label={translate('postCodeLabel')}
                                placeholder={translate('postCodePlaceholder')}
                                value={values.post_code}
                                keyboardType={'numeric'}
                                labelSize={14}
                                error={touched.post_code && errors.post_code}
                                onChangeText={handleChange('post_code')}
                                onBlur={() => setFieldTouched('post_code')}
                                marginBottom={20}
                                width={'150px'}
                                errorText={errors.post_code}
                                isMasked={true}
                                mask={"[00000]-[000]"}
                            />
                        </View>
                        
                        <CustomInput
                            label={translate('complementLabel')}
                            placeholder={translate('complementPlaceholder')}
                            value={values.complement}
                            onChangeText={handleChange('complement')}
                            marginBottom={20}
                            error={touched.complement && errors.complement}
                            onBlur={() => setFieldTouched('complement')}
                            errorText={errors.complement}
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
    account: state.manageAccountReducer.account
})
  
export default connect(
    mapStateToProps, {
    ...ManagerAccountActions
})(AdressAccountStep)
