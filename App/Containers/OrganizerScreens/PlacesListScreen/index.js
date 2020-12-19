import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import { Chip } from 'react-native-paper';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import api from '../../../Services/api'
import currencies from '../../../Services/currencies.json'
import { Images } from 'App/Theme'

import {
  Feedback,
  CardWithImage,
  CustomToast,
  ScreensHeader,
  AnimationLoading,
} from '../../../Components'

import {
  Container,
  CardList,
  HeaderContainer,
  ListTitle,
  ActiveFiltersContainer,
  ActiveFiltersBox,
  ActiveFiltersText,
  styles
} from './styles'
import { translate, toNumber } from '../../../Locales'

export class PlacesListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      page: 1,
      refreshing: false,
      spaces: [],
      feedbackType: '',
      activeImageIndex: 0,
      activeFilters: [],
    }
  }
  
  componentDidMount() {
    this.loadSpaces()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  }

  getCurrencySymbol = (actualCurrency) => {
    const symbol = currencies.filter(currency => {
      if(currency.value == actualCurrency) {
        return currency
      }
    })
    
    return symbol[0].symbol
  }

  mapQueries = (queries) => {
    
    const mappedFilters = _.map(_.pickBy(queries, _.identity), (value, key) => {
      let translatedKey = translate(key);
      let translatedValue = value;

      if((key === 'category' || key === 'chargeType') && value.length) {
        translatedValue = translate(value);
      }

      return { key: translatedKey, value: translatedValue };
    })

    return mappedFilters;
  }

  loadSpaces = async () => {
    const { queries } = this.props

    const mappedFilters = this.mapQueries(queries);
    
    console.log({mappedFilters})

    this.setState({ loading: true, activeFilters: mappedFilters })

    try {
      const { data } = await api.get(`/spaces/${this.state.page}`, { ...queries}, {
        authorization: `Bearer ${this.props.user.token}`
      })
      const mappedSpaces = this.mapSpaces(data)
       console.log(mappedSpaces)
      this.setState({
        spaces: mappedSpaces,
        loading: false,
        feedbackType: 'not_found'
      })

    } catch (error) {
      this.setState({ loading: false, feedbackType: 'error' })
      console.log({error})
    }
  }

  mapSpaces = (data) => {
    if(!data.length) return []

    const mappedSpaces = data.map(space => {//mapear os cards 
      return {
        id: space.id,
        title: space.title,
        text: space.adress,
        imageIndex: 0,
        images: space.images,
        leftIcon: Images.coins,
        leftInfo: `${this.getCurrencySymbol(space.monetary_unit)}${toNumber(space.price)} / ${translate(space.charge_type)}`,
        rigthIcon: Images.group,
        rigthInfo: space.capacity,
      }
    })

    return mappedSpaces
  }

  onSnapToItem = (item, index) => {
    const { spaces } = this.state
    let copySpaces = spaces.map(space => space)

    copySpaces.map(space => {
      if(space.id == item.id) {
        space.imageIndex = index
      }

      return space
    })

    this.setState({ spaces: copySpaces })
  }

  goBack = () => {
    this.props.navigation.goBack(null)
  }

  goToPlaceDetails = (id) => {
    this.props.navigation.push('PlaceDetailsScreen', {
      space_id: id
    })
  }

  render() {
    const { queries } = this.props
    const { activeFilters } = this.state

    return (
      <>
        {this.state.loading ? (
          <AnimationLoading
            fullscreen={true}
            loading={this.state.loading}
          />
        ) : (
          <Container>
            <ScreensHeader
              onPress={() => this.goBack()}
              title={translate('spacesTabLabel')}
            />

            <ActiveFiltersContainer
              horizontal={true}
              contentContainerStyle={styles.contentContainer}
            >
              {activeFilters.map((filter, index) => (
                // <ActiveFiltersBox index={index}>
                //   <ActiveFiltersText>{`${filter.key}: ${filter.value}`}</ActiveFiltersText>
                // </ActiveFiltersBox>
                <Chip style={{ marginRight: 10 }}>{`${filter.key}: ${filter.value}`}</Chip>
              ))}

            </ActiveFiltersContainer>

            <CardList
              data={this.state.spaces}
              onRefresh={() => this.loadSpaces()} 
              refreshing={false}
              renderItem={({item}) => (
                <CardWithImage
                  item={item}
                  activeImageIndex={this.state.activeImageIndex}
                  onCardPress={this.goToPlaceDetails}
                  onSnapToItem={this.onSnapToItem}
                />
              )}
              ListEmptyComponent={() => {
                return (
                  <Feedback feedbackType={this.state.feedbackType}/>
                )
              }}
            />
          </Container>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  queries: state.spaceQueriesReducer.queries,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesListScreen)
