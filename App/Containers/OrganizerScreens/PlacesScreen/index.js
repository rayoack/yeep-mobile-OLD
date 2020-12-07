import React from 'react'
import { Platform, Text, TouchableOpacity, View, Button, ActivityIndicator, Image, TextInput, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
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
    }
  }

  componentDidMount() {
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
      <ScrollView>
        <Header />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
           <TextImageAdress>
            {translate('organizerStepSixtitle')}
            </TextImageAdress>
          <ImageAdress  source={Images.AdressIllustration} />

          <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableFilter onPress={() => this.props.navigation.navigate('PlacesListScreen')}>
            <Icon name={'search'} size={20} style={{color: 'gray'}}/>
            <TouchableFilterText >
            {translate('searchSpace')}
            </TouchableFilterText>
          </TouchableFilter>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30, marginLeft: 20}}>
            <Category style={{backgroundColor: '#746bc5'}}>
              <Image style= {{width: 70, height: 70, marginBottom: 20, marginLeft: 35}}source={Images.eventVenuePartyHallWhite} />
              <Text style={{textAlign: 'center', fontSize: 10, color: 'white'}}>{translate('eventVenuePartyHall')}</Text>
            </Category>
            <Category style={{backgroundColor: '#64bcd9'}}>
            <Image style= {{width: 70, height: 70,marginTop: 30, marginBottom: 10, marginLeft: 35}}source={Images.studioWhite} />
            <Text style={{textAlign: 'center', fontSize: 10, color: 'white'}}>{translate('studio')}</Text>
            </Category>
            <Category style={{backgroundColor: '#8aa4cf'}}>
            <Image style= {{width: 70, height: 70,marginTop: 30, marginBottom: 10, marginLeft: 35}}source={Images.meetingRoomWhite} />
            <Text style={{textAlign: 'center', fontSize: 10, color: 'white'}}>{translate('classroom')}</Text>
            </Category>
            <Category style={{backgroundColor: '#e59091'}}>
            <Image style= {{width: 70, height: 70,marginTop: 30, marginBottom: 10, marginLeft: 35}}source={Images.houseWhite} />
            <Text style={{textAlign: 'center', fontSize: 10, color: 'white'}}>{translate('house')}</Text>
            </Category> 
          </View>     

          <View style={{width: 350}}>
          <View style={{marginBottom: 20}}> 
            <Text style={{fontSize:20, fontWeight: 'bold'}}>{translate('spaceAproximity')}</Text>
            <Text style={{fontSize: 15}}>{translate('city')}: Belford Roxo</Text>
          </View>
        <FlatList
          data={cards}
          refreshing={false}
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
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesScreen)
