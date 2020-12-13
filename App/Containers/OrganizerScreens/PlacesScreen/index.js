import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Creators as spaceQueriesActions } from '../../../Stores/reducers/spaceQueriesReducer';
import {Images, Colors } from 'App/Theme';
import { Header, CardWithImage, AnimationLoading, Feedback } from '../../../Components';
import { translate, toNumber } from '../../../Locales';
import * as RNLocalize from "react-native-localize";
import Icon from 'react-native-vector-icons/MaterialIcons';
import currencies from '../../../Services/currencies.json';

import { 
  Category,
  CardList,
  HeaderContainer,
  ImageAdress, 
  ListTitle,
  TextImageAdress, 
  TouchableFilter,
  TouchableFilterText } from './styles';
  
import api from '../../../Services/api';

class PlacesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      page:1,
      refreshing: false,
      spaces:[],
      activeImageIndex: 0,
      feedbackType: '',
      categories: [
        {
          name: translate('eventVenuePartyHall'),
          image: Images.eventVenuePartyHallWhite,
          value: 'eventVenuePartyHall',
          backgroundColor: Colors.primary
        },
        {
          name: translate('studio'),
          image: Images.studioWhite,
          value: 'studio',
          backgroundColor: Colors.poolBlue
        },
        {
          name: translate('meetingRoom'),
          image: Images.meetingRoomWhite,
          value: 'meetingRoom',
          backgroundColor: Colors.saintBlue
        },
        {
          name: translate('house'),
          image: Images.houseWhite,
          value: 'house',
          backgroundColor: Colors.lightPink
        }
      ]
    }
  }

  componentDidMount() {
    this.loadSpaces()
  }

  loadSpaces = async () => {

    this.setState({loading: true})
  
    if(!this.props.user && !this.props.signed && !this.props.user.token) {
      this.redirectToLoginScreen()
    }
    
    try {
      const { data } = await api.get(`/spaces/${this.state.page}`, {
        state: this.props.user.state,
        country: this.props.user.country
      }, 
        {
        authorization: `Bearer ${this.props.user.token}`
      })

      const mappedSpaces = this.mapSpaces(data);
      
      this.setState({
        spaces: mappedSpaces,
        loading: false
      }) 

    } catch (error) {
      console.log({error})

      if(error.response && error.response.status == 401) {
        this.redirectToLoginScreen()
      }
    }
  }
 
  navigateToCategory = (category) => {
    console.log(this.props.setSpaceCategoryQuery)
    if(this.props.user && this.props.user.state && this.props.user.country) {
      this.props.setSpaceCategoryQuery(category.value)
      this.props.setSpaceStateQuery(this.props.user.state)
      this.props.setSpaceCountryQuery(this.props.user.country)
      this.props.navigation.navigate('PlacesListScreen')
    }
  }
    
  navigateToFilters = () => {
    this.props.clearSpaceQueries();
    this.props.navigation.navigate('PlacesFilterScreen')
  }

  getCurrencySymbol = (actualCurrency) => {
    const symbol = currencies.filter(currency => {
      if(currency.value == actualCurrency) {
        return currency
      }
    })
    
    return symbol[0].symbol
  } 
  
  goToPlaceDetails = (id) => {
    this.props.navigation.push('PlaceDetailsScreen', {
      space_id: id
    })
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
        leftInfo: `${this.getCurrencySymbol(space.monetary_unit)}${toNumber(space.price)} / ${translate(space.charge_type)}`,
        rigthIcon: Images.group,
        rigthInfo: space.capacity,
      }
    })
    return mappedSpaces
  }

  render() {
    const { categories, spaces, loading } = this.state;
    const { user } = this.props
    return (
      <>
      <Header navigation={this.props.navigation}/>
      {loading ? (
        <AnimationLoading
         loading={loading}
         />
      ) : (
        <>
        <ScrollView style={{ backgroundColor: Colors.backgroundGray }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
           <TextImageAdress>
            {translate('placesScreenTitle')}
            </TextImageAdress>
          <ImageAdress  source={Images.AdressIllustration} />

          <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableFilter onPress={() => this.navigateToFilters()}>
            <Icon name={'search'} size={30} style={{color: Colors.primary}}/>
            <TouchableFilterText >
            {translate('searchSpace')}
            </TouchableFilterText>
          </TouchableFilter>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30, marginLeft: 10, alignItems: 'center'}}>
            {categories.map((category, index) => (  
              <Category
                onPress={() => this.navigateToCategory(category)
              }
                activeOpacity={0.6}
                style={{backgroundColor: category.backgroundColor, alignItems: 'center', justifyContent: 'center'}}>
                <Image style= {{width: 70, height: 70, marginBottom: 10}}source={category.image} />
                <Text style={{textAlign: 'center', fontSize: 12, color: Colors.white, fontFamily: 'Nunito Regular'}}>
                  {category.name}
                </Text>
              </Category>
            ))}
          </View>

          <View style={{width: 350}}>
          <View style={{marginBottom: 20, marginLeft: 20}}> 
            <Text style={{fontSize:20, fontFamily: 'Nunito Bold', color: Colors.labelBlack}}>{translate('nearbySpaces')}</Text>
            <Text style={{fontSize: 15, fontFamily: 'Nunito Regular', color: Colors.textDefault}}>{translate('spaceState')}: {this.props.user.state} </Text>
          </View>
        <CardList
          data={spaces}
          onRefresh={() => this.loadSpaces()}
          refreshing={false}
          renderItem = {({item}) => (
          <CardWithImage
          item={item} 
          activeImageIndex={this.state.activeImageIndex} 
          onCardPress={this.goToPlaceDetails}
          onSnapToItem={this.onSnapToItem}
          />
          )}
          ListHeaderComponent={() => (
            <HeaderContainer>
              <ListTitle>
                {this.state.feedbackType != 'error' ?
                `${translate('spacesInTitle')}  ${user.state}`
                : ''
              }
              </ListTitle>
            </HeaderContainer>
          )}
          ListEmptyComponent={() => {
            return (
              <Feedback feedbackType={this.state.feedbackType} />
            )
          }}
        />  
      </View>
    </View>
  </ScrollView>
  </>
        )}
        </>
     )
   }
}

PlacesScreen.propTypes = {
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(
  mapStateToProps,
  {
    ...spaceQueriesActions
  }
)(PlacesScreen)
