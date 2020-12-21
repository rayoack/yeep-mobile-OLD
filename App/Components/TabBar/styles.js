import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'
import { Colors } from 'App/Theme'

export const Container = styled.View`
  flex-direction: row;
  height: 70px;
  /* width: 100%; */
  background-color: ${Colors.white};
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  elevation: 1;
  shadow-offset: {width: 0, height: 1 }; 
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 0;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  /* border-top-left-radius: 40px;
  border-top-right-radius: 40px; */
  /* position: absolute;
  bottom: 0;
  z-index: 99; */
`;

export const TabButton = styled.TouchableOpacity`
  flex: 1;
  margin-top: ${props => props.routeActive ? 20 : 0 };;
  justify-content: center;
  align-items: center;
`;

export const TabNavText = styled.Text`
  font-family: 'Nunito Bold';
  font-size: 10px;
  line-height: 12px;
  margin-top: ${Platform.OS === 'ios' ? 10 : 10};
  margin-bottom: ${Platform.OS === 'ios' ? 15 : 15};
  color: ${props => props.routeActive ? Colors.primary : Colors.labelBlack };
`