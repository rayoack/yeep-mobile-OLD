import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.View`
  align-items: center;
  padding-left: 60px;
  padding-right: 60px;
  flex: 1;
`;

export const TopContainer = styled.View`
  flex-direction: row;
  margin-bottom: 23px;
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

export const AskRegisterText = styled.Text`
  color: ${Colors.primary};
  font-size: 14px;
  font-family: "Nunito Semi Bold"
`

export const SignupText = styled.Text`
  color: ${Colors.secondary};
  font-size: 14px;
  font-family: "Nunito Extra Bold";
  margin-left: 10px;
`