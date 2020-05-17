import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';

import CustomInput from '../CustomInput'

import { translate } from '../../Locales'
import { Images, Colors } from 'App/Theme'

import {
  Container,
  ViewContainer } from './styles'

export const EventDescription = ({
  event,
  setSaveNextStepForm,
  setDescription,
}) => {
  const { description } = event

  return (
    <Container>
      <ViewContainer>
        <Formik
          initialValues={{
            description: description }}
          onSubmit={values => setDescription(values)}
          validationSchema={
            Yup.object().shape({
              description: Yup
                .string()
            })
          }
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldTouched
          }) => {
            setSaveNextStepForm(handleSubmit)

            return (
              <CustomInput
                label={translate('thirdEditEventStepTitle')}
                text={translate('thirdEditEventStepText')}
                placeholder={translate('eventDescriptionPlaceholder')}
                value={values.description}
                onChangeText={handleChange('description')}
                marginBottom={20}
                onBlur={() => setFieldTouched('description')}
                height={'300px'}
                multiline={true}
              />
            )
          }}
        </Formik>

      </ViewContainer>
    </Container>
  )
}

EventDescription.defaultProps = {
  event: { description: '' },
  setSaveNextStepForm: () => null,
  setDescription: () => null,
}

const mapStateToProps = (state) => ({
  event: state.manageEventReducer.event
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDescription)
