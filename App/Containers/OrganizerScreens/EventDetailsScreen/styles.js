import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.backgroundGray};
`;

export const EventCover = styled(FastImage)`
  height: 200px;
  width: ${Dimensions.get('window').width};
  background-color: ${Colors.ligthGray2};
  margin-bottom: 15px;
`

export const EventRowContainer = styled.View`
  flex-direction: row;
  width: 250px;
  margin-bottom: 5px;
  align-items: center;
`

export const EventHeader = styled.View`
  position: absolute;
  top: 0;
  z-index: 99;
  padding: 20px;
  height: 50px;
  justify-content: center;
  border-bottom-left-radius: 30px;
  /* background-color: ${Colors.white}; */
  width: ${Dimensions.get('window').width};
  background-color: ${Colors.blackTransparent};
`

export const BackButtonContainer = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`

export const EventContainer = styled.View`
  padding: 0 20px;
  margin-bottom: ${props => props.loading ? '20px' : 0};
`

export const EventTitle = styled.Text`
  font-size: 35px;
  font-family: 'Nunito Extra Bold';
  width: 200px;
  margin-bottom: 10px;
  color: ${Colors.labelBlack};
  background-color: ${props => props.loading ? Colors.ligthGray2 : Colors.backgroundGray};
`

export const EventLabel = styled.Text`
  font-size: 18px;
  width: 100px;
  color: ${Colors.labelBlack};
  background-color: ${props => props.loading ? Colors.ligthGray2 : Colors.backgroundGray};
`

export const EventText = styled.Text`
  font-size: 14px;
  color: ${Colors.textDefault};
`

export const EventSubText = styled.Text`
  font-size: 11px;
  width: 270px;
  margin: -8px 0 10px 30px;
  color: ${Colors.ligthGray2};
`