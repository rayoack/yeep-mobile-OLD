import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const BackButtonContainer = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
`

export const HeaderTitle = styled.Text`
  flex: 1;
  text-align: right;
  font-size: 30px;
  font-family: 'Nunito Semi Bold';
  color: ${Colors.primary};
`
