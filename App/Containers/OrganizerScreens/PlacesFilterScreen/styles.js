import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  flex: 1;
  width: ${Dimensions.get('window').width};
  padding: 20px;
  background-color: ${Colors.backgroundGray};
`;

export const LocationContainer = styled.View`
  margin: 10px 0;
  padding-bottom: 20px;
  width: ${Dimensions.get('window').width};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
`

export const LocationLabel = styled.Text`
  font-size: 20px;
  font-family: 'Nunito Bold';
  width: 100px;
  color: ${Colors.labelBlack};
  background-color: ${props => props.loading ? Colors.ligthGray2 : Colors.backgroundGray};
`
