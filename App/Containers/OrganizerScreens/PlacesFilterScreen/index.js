import React, { Component } from 'react'
import { View, Dimensions, BackHandler } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Images } from 'App/Theme'
import * as RNLocalize from "react-native-localize";
import LinearGradient from 'react-native-linear-gradient';

import { Creators as spaceQueriesActions } from '../../../Stores/reducers/spaceQueriesReducer'
import { translate } from '../../../Locales'
import countriesList from '../../../Services/countries.json'
import currenciesList from '../../../Services/currencies.json'
import spaceCategories from '../../../Services/spaces-categories.json'

import {
  ScreensHeader,
  CustomPicker,
  CustomInput,
  CardSelect,
  ButtonWithBackground
} from '../../../Components'

import {
  Container,
  LocationContainer,
  QueryLabel,
  RowContainer,
  SearchButtonContainer,
  ImageHeaderContainer,
  ImageHeader
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
    this.setSpaceCountryQuery('Argentina')
    this.setUserCurrency()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  setUserCurrency = () => {
    const userCurrencies = RNLocalize.getCurrencies()
    userCurrencies.length ?
      this.setSpaceMonetaryUnitQuery(userCurrencies[0])
      : this.setSpaceMonetaryUnitQuery('BRL')
  }

  setSpaceCountryQuery = (country) => {
    this.props.setSpaceCountryQuery(country)
    this.setCountryStates(country)
  }

  setSpaceStateQuery = (state) => {
    this.props.setSpaceStateQuery(state)
  }

  setSpaceCategoryQuery = (category) => {
    this.props.setSpaceCategoryQuery(category.value)
    this.setState({ selectedCategory: category })
  }

  setSpaceHasParkingQuery = (hasParking) => {
    this.props.setSpaceHasParkingQuery(hasParking.value)
    this.setState({ selectedParkingOption: hasParking })
  }

  setSpaceChargeTypeQuery = (chargeType) => {
    this.props.setSpaceChargeTypeQuery(chargeType.value)
    this.setState({ selectedChargeType: chargeType })
  }

  setSpaceCapacityMinQuery = (capacityMin) => {
    this.props.setSpaceCapacityMinQuery(capacityMin)
  }

  setSpaceCapacityMaxQuery = (capacityMax) => {
    this.props.setSpaceCapacityMaxQuery(capacityMax)
  }

  setSpaceMonetaryUnitQuery = (monetaryUnit) => {
    this.props.setSpaceMonetaryUnitQuery(monetaryUnit)
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
        value: state.code
      }
    })

    this.setSpaceStateQuery(countryStates[0].value)
    this.setState({ countryStates })
  }

  setCountries = () => {
    const countries = countriesList.map(country => {
      return {
        title: translate(country.name),
        value: country.name
      }
    })

    return countries
  }

  navigateToPlacesListScreen = () => {
    this.props.navigation.push('PlacesListScreen')
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

    const currenciesMapped = currenciesList.map(currency => {
      const currencyTranslate = translate(currency.title)
      return {
        title: currencyTranslate,
        value: currency.value
      }
    })

    return (
      <>
        <Container>
          <ScreensHeader
            onPress={() => this.goBack()}
            title={translate('spacesTabLabel')}
          />

          <ImageHeaderContainer>
            <ImageHeader source={Images.cityIllustration}/>
          </ImageHeaderContainer>

          <QueryLabel>{translate('whereQuery')}</QueryLabel>
          <LocationContainer>
            <CustomPicker
              actualValue={spaceQueries.country}
              values={countries}
              labelSize={16}
              onValueChange={value => this.setSpaceCountryQuery(value)}
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

          <CustomPicker
            actualValue={spaceQueries.monetaryUnit}
            values={currenciesMapped}
            labelSize={16}
            onValueChange={this.setSpaceMonetaryUnitQuery}
            label={translate('monetaryUnit')}
            marginBottom={10}
            // error={errors.state}
            // errorText={errors.state}
          />

          <QueryLabel>{translate('spacePriceLabel')}</QueryLabel>
          <RowContainer>
            <CustomInput
              label={translate('priceMinQuery')}
              labelSize={12}
              width={(Dimensions.get('window').width / 2) - 25}
              value={spaceQueries.priceMin}
              onChangeText={this.setSpacePriceMinQuery}
              keyboardType={'numeric'}
              marginRight={5}
            />

            <CustomInput
              label={translate('priceMaxQuery')}
              labelSize={12}
              width={(Dimensions.get('window').width / 2) - 25}
              value={spaceQueries.priceMax}
              onChangeText={this.setSpacePriceMaxQuery}
              keyboardType={'numeric'}
              marginLeft={5}
            />
          </RowContainer>

          <QueryLabel>{translate('capacityLabel')}</QueryLabel>
          <RowContainer>
            <CustomInput
              label={translate('capacityMinQuery')}
              labelSize={12}
              width={(Dimensions.get('window').width / 2) - 25}
              value={spaceQueries.capacityMin}
              onChangeText={this.setSpaceCapacityMinQuery}
              keyboardType={'numeric'}
              marginRight={5}
            />

            <CustomInput
              label={translate('capacityMaxQuery')}
              labelSize={12}
              width={(Dimensions.get('window').width / 2) - 25}
              value={spaceQueries.capacityMax}
              onChangeText={this.setSpaceCapacityMaxQuery}
              keyboardType={'numeric'}
              marginLeft={5}
            />
          </RowContainer>

          <CardSelect
            title={translate('spaceType')}
            cards={categoriesMapped}
            selectedCards={this.state.selectedCategory}
            onCardPress={this.setSpaceCategoryQuery}
          />

        <View style={{ marginBottom: 80 }} />
        </Container>

        <SearchButtonContainer
          colors={['rgba(238, 238, 238, 0.0)', 'rgba(74, 74, 74, 0.2)']}
        >
          <ButtonWithBackground
            text={translate('searchText')}
            onPress={() => this.navigateToPlacesListScreen()}/>
        </SearchButtonContainer>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  spaceQueries: state.spaceQueriesReducer.queries
})

export default connect(mapStateToProps, {
  ...spaceQueriesActions
})(PlacesFilterScreen)
