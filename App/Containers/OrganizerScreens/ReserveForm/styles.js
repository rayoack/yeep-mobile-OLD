import styled from 'styled-components/native'
import { Dimensions, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'
import { CollapsibleList } from '../../../Components'
import Icon from 'react-native-vector-icons/Ionicons'

export const StyledIcon = styled(Icon)`
`

export const ReserveHeader = styled.View`
  /* position: absolute;
  z-index: 99; */
  margin: 0 0 30px;
  flex-direction: row;
`

export const CloseButtonContainer = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.lightSecondaryTransparent};
  /* box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.32);
  elevation: 10; */
`

export const Container = styled.ScrollView`
  padding: 20px;
  background-color: ${Colors.backgroundGray};
  width: ${Dimensions.get('window').width};
`;

export const Divider = styled.View`
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

export const DateContainer = styled.View`
  height: 160px;
  margin: 10px 0;
`

export const InsertDayContainer = styled.View`
  flex-direction: row;
`

export const DeleteDateIcon = styled(FastImage)`
  height: 25px;
  width: 25px;
`

export const DeleteDateContainer = styled.TouchableOpacity`
  /* margin-bottom: 40px; */
  position: relative;
  top: 5;
  justify-content: center;
  padding: 10px;
  align-items: center;

`

export const HoursContainer = styled.View`
  flex-direction: row;
`

export const ViewMoreButton = styled.View`
  height: 50px;
  width: 100%;
  border-width: 2px;
  border-color: ${Colors.secondary};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`

export const StyledCollapsibleList = styled(CollapsibleList)`
  flex: 1;
  overflow: hidden;
  margin-bottom: 15px;
`

export const PriceInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

export const CheckButton = styled.TouchableOpacity`
  height: 50px;
  width: 150px;
  padding: 10px;
  background-color: ${Colors.primary};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled ? 0.4 : 1};
`

export const FooterContainer = styled.View`
  height: 80px;
  position: absolute;
  bottom: 0;
  width: ${Dimensions.get('window').width};
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Colors.white};
  box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.32);
  elevation: 10;
  align-items: center;
`
