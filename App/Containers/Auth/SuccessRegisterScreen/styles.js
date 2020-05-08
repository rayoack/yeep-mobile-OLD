import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Slide = styled.View`
  flex: 1;
  background-color: ${props => props.color};
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export const SlideTitle = styled.Text`
  font-size: 30px;
  font-family: 'Nunito Bold';
  color: ${Colors.white};
  text-align: center;
  margin-bottom: 20px;
`;

export const SlideDescription = styled.Text`
  font-size: 20px;
  font-family: 'Nunito Regular';
  color: ${Colors.white};
  text-align: center;
`;

export const SlideImage = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;
