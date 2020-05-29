import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  padding: 0 25px;
  background-color: ${Colors.backgroundGray};
`;

export const CenterView = styled.View`
  align-items: center;
  margin: ${props => props.margin ? props.margin : '0' };
`

export const PlaceDivider = styled.View`
  width: ${Dimensions.get('window').width};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
  margin: 5px 0;
  margin-top: ${props => props.marginTop ? props.marginTop : 0};
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : "5px"};
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
  font-family: 'Nunito Bold';
  margin-bottom: 10px;
  color: ${Colors.labelBlack};
`

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.container ? 'space-between' : 'flex-start'};
  marginBottom: ${props => props.marginBottom ? props.marginBottom : '0' };
`

export const IconImage = styled.Image`
  height: 25px;
  width: 25px;
  margin-right: 10px;
`

export const IconTitle = styled.Text`
  font-size: 16px;
  font-family: 'Nunito Regular';
  color: ${Colors.labelBlack};
`

export const PlaceLabel = styled.Text`
  font-size: 20px;
  font-family: 'Nunito Bold';
  color: ${Colors.labelBlack};
`

export const PlaceText = styled.Text`
  font-size: ${props => props.fontSize ? props.fontSize : '12px' };
  font-family: ${props => props.fontFamily ? props.fontFamily : 'Nunito Regular' };
  color: ${props => props.fontColor ? props.fontColor : Colors.textDefault };
  text-align: ${props => props.textAlign ? props.textAlign : 'left' };
  margin-top: ${props => props.marginTop ? props.marginTop : '0' };
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0' };
`

export const TouchableView = styled.TouchableOpacity`
  align-items: ${props => props.alignItems ? props.alignItems : 'flex-start' };
  align-self: ${props => props.alignSelf ? props.alignSelf : 'flex-start' };
  margin: ${props => props.margin ? props.margin : '0' };
`

export const ProfileImage = styled(FastImage)`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`
