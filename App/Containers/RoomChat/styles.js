import styled from 'styled-components/native';
import { Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.View`
  
`;

export const ChatHeader = styled.View`
  height: 60px;
  width: ${Dimensions.get('window').width};
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
  background-color: ${Colors.secondary};
`

export const ChatInfoContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  flex: 1;
`

export const ChatImage = styled(FastImage)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 17px;
`

export const ChatTitle = styled.Text`
  width: 200px;
  font-size: 15px;
  font-family: 'Nunito Semi Bold';
  color: ${Colors.white};
`

export const ChatSubTitle = styled.Text`
  width: 200px;
  font-size: 12px;
  font-family: 'Nunito Regular';
  color: ${Colors.white};
`

export const ReserveDetailsButtonContainer = styled.TouchableOpacity`
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;

`