import styled from 'styled-components/native'
import { Dimensions, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  padding: 20px;
  background-color: ${Colors.backgroundGray};
  width: ${Dimensions.get('window').width};
`;

export const PlaceDivider = styled.View`
  width: ${Dimensions.get('window').width};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
  margin: 5px 0;
  margin-top: ${props => props.marginTop ? props.marginTop : 0};
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : "5px"};
`

export const PlaceDetailsContainer = styled.View`
  margin-bottom: 25px;
`

export const PlaceInfosContainer = styled.View`
  margin-top: 16px;
  flex-direction: row;
`

export const StyledView = styled.View`
  flex: 1;
  width: ${props => props.width ? props.width : Dimensions.get('window').width };
  /* height: ${props => props.height ? props.height : 'none' }; */
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'column' };
  padding: ${props => props.padding ? props.padding : '0' };
  margin-top: ${props => props.marginTop ? props.marginTop : '0' };
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0' };
  align-items: ${props => props.alignItems ? props.alignItems : 'flex-start' };
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start' };
  background-color: ${props => props.backgroundColor ? props.backgroundColor : 'transparent' };
`

export const StyledText = styled.Text`
  font-size: ${props => props.fontSize ? props.fontSize : '12px' };
  font-family: ${props => props.fontFamily ? props.fontFamily : 'Nunito Regular' };
  color: ${props => props.fontColor ? props.fontColor : Colors.textDefault };
  text-align: ${props => props.textAlign ? props.textAlign : 'left' };
  margin-top: ${props => props.marginTop ? props.marginTop : '0' };
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0' };
`

export const StyledImage = styled(FastImage)`
  width: ${props => props.width ? props.width : '100px' };
  height: ${props => props.height ? props.height : '80px' };
  border-radius: ${props => props.borderRadius ? props.borderRadius : '0' };
  margin-top: ${props => props.marginTop ? props.marginTop : '0' };
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0' };
`

export const StyledTextInput = styled.TextInput`
  font-size: ${props => props.fontSize ? props.fontSize : '12px' };
  font-family: ${props => props.fontFamily ? props.fontFamily : 'Nunito Regular' };
  color: ${props => props.fontColor ? props.fontColor : Colors.textDefault };
  text-align: ${props => props.textAlign ? props.textAlign : 'left' };
  margin: ${props => props.margin ? props.margin : '0' };
`