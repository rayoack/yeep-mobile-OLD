import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'

export const Container = styled.View`
  align-items: center;
  padding-left: 60px;
  padding-right: 60px;
  flex: 1;
`;

export const Logo = styled(FastImage)`
  width: 263px;
  height: 263px;
`

export const LoginButtonContainer = styled.View`
  margin-top: 55px;
`

export const Footer = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  flex-direction: row;
`

export const AskRegisterText = styled.Text`
  color: #8965A3;
  font-size: 14px;
  font-family: "Nunito Semi Bold"
`

export const SignupText = styled.Text`
  color: #FFDE59;
  font-size: 14px;
  font-family: "Nunito Extra Bold";
  margin-left: 10px;
`