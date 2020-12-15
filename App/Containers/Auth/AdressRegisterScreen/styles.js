import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Container = styled.View`
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  flex: 1;
  width: 100%;
  justify-content: flex-end;
`;

export const AdressRegisterTitle = styled.Text`
  font-size: 30px;
  font-family: 'Nunito Regular';
  color: ${Colors.labelBlack};
  text-align: center;
`

export const TopContainer = styled.View`
  flex-direction: row;
  margin: 23px 0;
`;

export const Logo = styled(FastImage)`
  width: 263px;
  height: 263px;
`

export const Footer = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  flex-direction: row;
`

export const AskSignInText = styled.Text`
  color: ${Colors.primary};
  font-size: 14px;
  font-family: "Nunito Semi Bold"
`

export const SignInText = styled.Text`
  color: ${Colors.secondary};
  font-size: 14px;
  font-family: "Nunito Extra Bold";
  margin-left: 10px;
`