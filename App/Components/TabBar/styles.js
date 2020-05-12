import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'

export const Container = styled.View`
  flex-direction: row;
  height: 52px;
  box-shadow: 3px 12px 10px rgba(0, 0, 0, 0.32);
  elevation: 10;
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
  margin-top: ${Platform.OS === 'ios' ? 15 : 20};
  margin-bottom: ${Platform.OS === 'ios' ? 15 : 15};
  color: ${props => props.routeActive ? colors.defaultPurple : colors.grayFont };
`