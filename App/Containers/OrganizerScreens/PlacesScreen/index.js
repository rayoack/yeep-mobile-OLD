import React from 'react'
import { Platform, Text, TouchableOpacity, View, Button, ActivityIndicator, Image, TextInput, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Creators as spaceQueriesActions } from '../../../Stores/reducers/spaceQueriesReducer'
import { ApplicationStyles, Helpers, Images, Colors } from 'App/Theme'
import { Header, CardWithImage } from '../../../Components'
import { translate } from '../../../Locales'
import * as RNLocalize from "react-native-localize";
import {CardList} from '../PlacesListScreen/styles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import currencies from '../../../Services/currencies.json'
import { 
  TouchableFilterText, 
  ImageAdress, 
  TextImageAdress, 
  TouchableFilter,
  Category } from './styles'

class PlacesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeImageIndex: 0,
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
  }

  navigateToCategory = (category) => {
    console.log(this.props.setSpaceCategoryQuery)
    if(this.props.user && this.props.user.state && this.props.user.country) {
      this.props.setSpaceCategoryQuery(category.value)
      this.props.setSpaceStateQuery(this.props.user.state)
      
      this.props.navigation.navigate('PlacesListScreen')
    }
  }

  navigateToFilters = () => {
    // console.log(this.props.clearSpaceQueries)
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
  
  render() {
    const { categories } = this.state;

    const cards = [
      {
        id: 0,
        images: [
          {id:1,
           url:"https://img.imirante.com.br/oestadoma/2020/02/06/1581014928-455112907-747x429.jpg"},
           {id:2,
            url:"https://img.imirante.com.br/oestadoma/2020/02/06/1581014928-455112907-747x429.jpg"}
        ],
        title: 'Boca de Fumo',
        text: 'Espaço bom para fazer sua festinha',
        leftIcon: Images.coins,
        leftInfo: 'R$ 400,00/Por dia',
        rigthIcon: Images.group,
        rigthInfo: 1233,
        imageIndex: 0,
        city: 'Belford Roxo'
      }
    ]
    
    return (
      <>
        <Header navigation={this.props.navigation}/>
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
                onPress={() => this.navigateToCategory(category)}
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
            <Text style={{fontSize: 15, fontFamily: 'Nunito Regular', color: Colors.textDefault}}>{translate('city')}: Belford Roxo</Text>
          </View>
        <FlatList
          data={cards}
          refreshing={false}
          style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}
          renderItem = {({item}) => (
          <CardWithImage
          item={item} 
          activeImageIndex={this.state.activeImageIndex} 
          />)}
          />  
          </View>
        </View>
        </ScrollView>
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
