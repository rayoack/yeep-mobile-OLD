import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import PropTypes from 'prop-types'
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
  ListTitle
} from './styles'
import { translate } from '../../../Locales'

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
    }
  }
  
  componentDidMount() {
    this.loadMyEvents()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null);
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

  loadMyEvents = async () => {
    const { queries } = this.props
    this.setState({ loading: true })

    try {
      const { data } = await api.get(`/spaces/${this.state.page}`, { ...queries }, {
        authorization: `Bearer ${this.props.user.token}`
      })

      const mappedSpaces = this.mapSpaces(data)

      this.setState({
        spaces: mappedSpaces,
        loading: false,
        feedbackType: 'emptyFeedback'
      })

    } catch (error) {
      this.setState({ loading: false, feedbackType: 'error' })
      console.log({error})
    }
  }

  mapSpaces = (data) => {
    if(!data.length) return []

    const mappedSpaces = data.map(space => {
      return {
        id: space.id,
        title: space.title,
        text: space.adress,
        imageIndex: 0,
        images: space.images,
        leftIcon: Images.coins,
        leftInfo: `${this.getCurrencySymbol(space.monetary_unit)}${space.price} / ${translate(space.charge_type)}`,
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

  render() {
    const { queries } = this.props

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

            <CardList
              data={this.state.spaces}
              onRefresh={() => this.loadMyEvents()} 
              refreshing={false}
              renderItem={({item}) => (
                <CardWithImage
                  item={item}
                  activeImageIndex={this.state.activeImageIndex}
                  onSnapToItem={this.onSnapToItem}
                />
              )}
              ListHeaderComponent={() => (
                <HeaderContainer>
                  <ListTitle>
                    {this.state.feedbackType != 'error' ?
                      `${translate('spacesInTitle')} ${queries.state}`
                      : ''
                    }
                  </ListTitle>
                </HeaderContainer>
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
