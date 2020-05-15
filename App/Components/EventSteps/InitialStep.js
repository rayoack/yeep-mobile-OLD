import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';

import CustomInput from '../CustomInput'
import CustomPicker from '../CustomPicker'

import { translate } from '../../Locales'
import { Images, Colors } from 'App/Theme'
import eventCategories from '../../Services/events-categories.json'

import {
  Container,
  ViewContainer,
  EventCover,
  EventCoverContainer,
  EventCoverLabel,
  EventCoverText } from './styles'

export const InitialStep = ({
  event,
  setSaveNextStepForm,
  setStepErrors,
  setCoverImage
}) => {
  const { title, estimated_audience, category, event_logo } = event
  eventCategories.sort()

  const categoriesMapped = eventCategories.map(category => {
    const categorieTranslate = translate(category)
    return {
      title: categorieTranslate,
      value: category
    }
  })

  const coverUri = event_logo ? event_logo.url : null

  return (
    <Container>
      <ViewContainer>
        <Formik
          initialValues={{
            title: title,
            category: category,
            estimated_audience: estimated_audience }}
          onSubmit={values => this.SignIn(values)}
          validationSchema={
            Yup.object().shape({
              title: Yup
                .string()
                .required(translate('titleRequired')),
              category: Yup
                .string()
                .required(translate('categoryRequired')),
            })
          }
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched
          }) => {
            setStepErrors(errors)
            setSaveNextStepForm(handleSubmit)

            return (
              <>
                <CustomInput
                  label={translate('eventTitleLabel')}
                  placeholder={translate('eventTitlePlaceholder')}
                  value={values.title}
                  onChangeText={handleChange('title')}
                  marginBottom={20}
                  error={touched.title && errors.title}
                  onBlur={() => setFieldTouched('title')}
                  errorText={errors.title}
                />

                <CustomPicker
                  label={translate('eventCategoryLabel')}
                  actualValue={values.category}
                  values={categoriesMapped}
                  onValueChange={handleChange('category')}
                  marginBottom={20}
                  error={errors.category}
                  errorText={errors.category}
                />

                <CustomInput
                  label={translate('audienceLabel')}
                  text={translate('audiencePlaceholder')}
                  value={values.estimated_audience}
                  keyboardType={'numeric'}
                  onChangeText={handleChange('estimated_audience')}
                  onBlur={() => setFieldTouched('estimated_audience')}
                  marginBottom={20}
                />
              </>
            )
          }}
        </Formik>

        <EventCoverLabel>{translate('addCoverLabel')}</EventCoverLabel>
        <EventCoverText>{translate('addCoverPlaceholder')}</EventCoverText>

        <EventCoverContainer onPress={() => setCoverImage('pickerImageTitle', 'single')} >
          {coverUri ? (
            <EventCover source={{ uri: coverUri }}/>
          ) : (
            <EventCover source={Images.image_background}/>
          )}
        </EventCoverContainer>
      </ViewContainer>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  event: state.manageEventReducer.event
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialStep)
