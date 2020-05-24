import React, { Component } from 'react'
import { View, Text, BackHandler } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Images } from 'App/Theme'

import { Creators as spaceQueriesActions } from '../../../Stores/reducers/spaceQueriesReducer'
import { translate } from '../../../Locales'
import countriesList from '../../../Services/countries.json'
import spaceCategories from '../../../Services/spaces-categories.json'

import {
  ScreensHeader,
  CustomPicker,
  CardSelect
} from '../../../Components'

import {
  Container,
  LocationContainer,
  LocationLabel
} from './styles'

export class PlacesFilterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countryStates: [],
      selectedCategory: { value: '' },
      selectedParkingOption: { value: '' },
      selectedChargeType: { value: '' },
      parkingOptions: [
        {
          title: translate('allSpace'),
          imageActive: Images.allSpaceActive,
          imageInactive: Images.allSpaceInactive,
          value: ''
        },
        {
          title: translate('withParking'),
          imageActive: Images.parkingActive,
          imageInactive: Images.parkingInactive,
          value: true
        },
      ],
      chargingTypes: [
        {
          title: translate('allSpace'),
          imageActive: Images.allSpaceActive,
          imageInactive: Images.allSpaceInactive,
          value: ''
        },
        {
          title: translate('perHour'),
          imageActive: Images.perHourActive,
          imageInactive: Images.perHourInactive,
          value: 'perHour'
        },
        {
          title: translate('perDay'),
          imageActive: Images.perDayActive,
          imageInactive: Images.perDayInactive,
          value: 'perDay'
        },
      ],
    }
  }

  componentDidMount() {
    this.setCountryStates('Argentina')
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  setSpaceCountryQuery = (country) => {
    this.props.setSpaceCountryQuery(country)
  }

  setSpaceStateQuery = (state) => {
    this.props.setSpaceStateQuery(state)
  }

  setSpaceCategoryQuery = (category) => {
    this.props.setSpaceCategoryQuery(category.value)
    this.setState({ selectedCategory: category })
  }

  setSpaceHasParkingQuery = (hasParking) => {
    console.log('hasParking', hasParking)
    this.props.setSpaceHasParkingQuery(hasParking.value)
    this.setState({ selectedParkingOption: hasParking })
  }

  setSpaceChargeTypeQuery = (chargeType) => {
    this.props.setSpaceChargeTypeQuery(chargeType)
    this.setState({ selectedChargeType: chargeType })
  }

  setSpaceCapacityMinQuery = (capacityMin) => {
    this.props.setSpaceCapacityMinQuery(capacityMin)
  }

  setSpaceCapacityMaxQuery = (capacityMax) => {
    this.props.setSpaceCapacityMaxQuery(capacityMax)
  }

  setSpacePriceMinQuery = (priceMin) => {
    this.props.setSpacePriceMinQuery(priceMin)
  }

  setSpacePriceMaxQuery = (priceMax) => {
    this.props.setSpacePriceMaxQuery(state)
  }

  goBack = () => {
    this.props.navigation.goBack(null)
  }

  navigateToPlacesListScreen = () => {
    this.props.navigation.push('PlacesListScreen')
  }

  setCountryStates = (countryName) => {
    const actualCountry = countriesList.filter(country => country.name == countryName)
    const countryStates = actualCountry[0].states.map(state => {
      return {
        title: state.name,
        value: state.name
      }
    })

    this.setState({ countryStates })
  }

  setCountries = () => {
    const countries = countriesList.map(country => {
      return {
        title: country.name,
        value: country.name
      }
    })

    return countries
  }

  render() {
    const { spaceQueries } = this.props
    const countries = this.setCountries()

    const categoriesMapped = spaceCategories.map(category => {
      const categorieTranslate = translate(category)
      return {
        title: categorieTranslate,
        imageActive: Images[`${category}Active`],
        imageInactive: Images[`${category}Inactive`],
        value: category == 'allSpace' ? '' : category
      }
    })

    return (
      <Container>
        <ScreensHeader
          onPress={() => goBack()}
          title={translate('spacesTabLabel')}
        />

        <LocationLabel>{translate('whereQuery')}</LocationLabel>
        <LocationContainer>
          <CustomPicker
            actualValue={spaceQueries.country}
            values={countries}
            labelSize={16}
            onValueChange={value => {
              this.setCountryStates(value)
              this.setSpaceCountryQuery(value)
            }}
            label={translate('spaceCountry')}
            marginBottom={10}
            // error={errors.country}
            // errorText={errors.country}
          />

          <CustomPicker
            actualValue={spaceQueries.state}
            values={this.state.countryStates}
            labelSize={16}
            onValueChange={this.setSpaceStateQuery}
            label={translate('spaceState')}
            marginBottom={10}
            // error={errors.state}
            // errorText={errors.state}
          />
        </LocationContainer>

        <CardSelect
          title={translate('parkingQuery')}
          cards={this.state.parkingOptions}
          selectedCards={this.state.selectedParkingOption}
          onCardPress={this.setSpaceHasParkingQuery}
        />

        <CardSelect
          title={translate('chargeType')}
          cards={this.state.chargingTypes}
          selectedCards={this.state.selectedChargeType}
          onCardPress={this.setSpaceChargeTypeQuery}
        />

        <CardSelect
          title={translate('spaceType')}
          cards={categoriesMapped}
          selectedCards={this.state.selectedCategory}
          onCardPress={this.setSpaceCategoryQuery}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  spaceQueries: state.spaceQueriesReducer.queries
})

export default connect(mapStateToProps, {
  ...spaceQueriesActions
})(PlacesFilterScreen)
