import styled from 'styled-components/native';
import { Colors } from 'App/Theme'
import { Dimensions } from 'react-native'

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

export const ChatTitle = styled.Text`
  width: 250px;
  font-size: 15px;
  font-family: 'Nunito Semi Bold';
  color: ${Colors.white};
`

export const ReserveDetailsButtonContainer = styled.TouchableOpacity`
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
`