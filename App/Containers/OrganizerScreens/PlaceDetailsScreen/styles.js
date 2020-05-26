import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  padding: 0 20px;
  background-color: ${Colors.backgroundGray};
`;

export const PlaceDivider = styled.View`
  width: ${Dimensions.get('window').width};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
  margin: 5px 0;
  margin-bottom: ${props => props.final ? '100px' : "5px"};
`

export const PlaceDetailsHeader = styled.View`
  position: absolute;
  z-index: 99;
  margin: 30px 20px 0;
  flex-direction: row;
`

export const BackButtonContainer = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.lightSecondaryTransparent};
  box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.32);
  elevation: 10;
`

export const CarouselContainer = styled.View`
  width: ${Dimensions.get('window').width};
  align-items: center;
  align-self: center;
`

export const CarouselFooterContainer = styled.View`
  position: absolute;
  width: 100%;
  bottom: 40px;
  left: 10px;
  padding: 0 16px;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`

export const SlideContainer = styled.TouchableOpacity``

export const SlideImage = styled(FastImage)`
  height: 250px;
  width: ${Dimensions.get('window').width};
  background-color: ${Colors.ligthGray2};
  margin-bottom: 15px;
`

export const SlideCountContainer = styled.View`
  height: 40px;
  width: 50px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${Colors.lightSecondaryTransparent};
  box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.32);
  elevation: 10;
`

export const SlideCount = styled.Text`
  font-size: 12px;
  font-family: 'Nunito Bold';
  color: ${Colors.white};
`

export const PlaceTitle = styled.Text`
  font-size: 30px;
  font-family: 'Nunito Extra Bold';
  margin-bottom: 10px;
  color: ${Colors.labelBlack};
`
