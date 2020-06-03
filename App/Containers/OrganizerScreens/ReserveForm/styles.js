import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  padding: 20px;
  background-color: ${Colors.backgroundGray};
`;

export const StyledView = styled.View`
  width: ${props => props.width ? props.width : '0' };
  height: ${props => props.height ? props.height : '0' };
  padding: ${props => props.padding ? props.padding : '0' };
  margin-top: ${props => props.marginTop ? props.marginTop : '0' };
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0' };
  align-items: ${props => props.alignItems ? props.alignItems : 'flex-start' };
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start' };
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
  width: ${props => props.width ? props.width : '100' };
  height: ${props => props.height ? props.height : '100' };
  margin-top: ${props => props.marginTop ? props.marginTop : '0' };
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0' };
`

export const StyledTextInput = styled.TextInput`
  font-size: ${props => props.fontSize ? props.fontSize : '12px' };
  font-family: ${props => props.fontFamily ? props.fontFamily : 'Nunito Regular' };
  color: ${props => props.fontColor ? props.fontColor : Colors.textDefault };
  text-align: ${props => props.textAlign ? props.textAlign : 'left' };
  margin-top: ${props => props.marginTop ? props.marginTop : '0' };
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0' };
`