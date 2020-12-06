import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'
import { Colors } from 'App/Theme'

export const Container = styled.View`
  flex-direction: row;
  height: 70px;
  /* width: 100%; */
  background-color: white;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
  box-shadow: 3px 12px 10px rgba(0, 0, 0, 0.32);
  elevation: 1;
  border-radius: 40px;
`;

export const TabButton = styled.TouchableOpacity`
  flex: 1;
  /* position: absolute; */
  margin-top: 20;
  justify-content: center;
  align-items: center;
`;

export const TabNavText = styled.Text`
  font-family: 'SFProText-Regular';
  font-size: 12px;
  line-height: 12px;
  margin-top: ${Platform.OS === 'ios' ? 10 : 10};
  margin-bottom: ${Platform.OS === 'ios' ? 15 : 15};
  color: ${props => props.routeActive ? Colors.labelBlack : Colors.ligthGray };
`