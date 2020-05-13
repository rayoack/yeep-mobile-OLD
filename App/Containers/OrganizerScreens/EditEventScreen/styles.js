import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.backgroundGray};
  width: ${Dimensions.get('window').width};
`;

export const BackButtonContainer = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.blackTransparent};
`

export const HeaderContainer = styled.View`
  flex-direction: row;
  background-color: ${Colors.secondary};
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  height: 60px;
  margin-bottom: 20px;
`

export const EventTitle = styled.Text`
  flex: 1;
  text-align: right;
  font-size: 30px;
  font-family: 'Nunito Semi Bold';
  color: ${Colors.ligthGray};
`
