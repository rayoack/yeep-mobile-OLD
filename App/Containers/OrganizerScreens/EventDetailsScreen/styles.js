import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.backgroundGray};
`;

export const EventCover = styled(FastImage)`
  height: 250px;
  width: ${Dimensions.get('window').width};
  background-color: ${Colors.ligthGray2};
  margin-bottom: 15px;
`

export const EventHeader = styled.View`
  /* position: absolute;
  top: 0;
  z-index: 99; */
  padding: 20px;
  height: 50px;
  justify-content: center;
  background-color: ${Colors.white};
  width: ${Dimensions.get('window').width};
`

export const BackButtonContainer = styled.TouchableOpacity`
`

export const EventContainer = styled.View`
  padding: 20px;
`

export const EventTitle = styled.Text`
  font-size: 28px;
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
