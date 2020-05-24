import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Creators as ManagerEventActions } from '../../Stores/reducers/manageEventReducer'

import CustomInput from '../CustomInput'

import { translate } from '../../Locales'
import { Images, Colors } from 'App/Theme'

import {
  Container,
  ViewContainer } from './styles'

const setEventDescription = (values, saveOrUpdateEvent, setDescription) => {
  setDescription(values.description)
  saveOrUpdateEvent(2)
}

export const EventDescription = ({
  event,
  setSaveNextStepForm,
  saveOrUpdateEvent,
  setDescription,
}) => {
  const { description } = event

  return (
    <Container>
      <ViewContainer>
        <Formik
          initialValues={{
            description: description }}
          onSubmit={values => setEventDescription(values, saveOrUpdateEvent, setDescription)}
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

export default connect(mapStateToProps, {
  ...ManagerEventActions
})(EventDescription)
