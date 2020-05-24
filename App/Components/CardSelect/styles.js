import styled from 'styled-components/native'
import { Platform, Dimensions } from 'react-native'
import { Colors } from 'App/Theme'

export const CardContainer = styled.View`
  flex: 1;
  margin-bottom: 10px;
  opacity: ${props => props.editable ? 1 : 0.4};
  padding-bottom: 20px;
  width: ${Dimensions.get('window').width};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
`

export const CardsTitle = styled.Text`
  font-family: 'Nunito Bold';
  font-size: ${props => props.labelSize ? props.labelSize : '20px'};
  color: ${Colors.labelBlack};
  margin-bottom: 10px;
`

export const CardsDescription = styled.Text`
  font-size: 12;
  color: ${Colors.textDefault};
  font-family: 'Nunito Regular';
  margin-bottom: 15px;
`

export const CardBoxContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`

export const SelectedCardBox = styled.TouchableOpacity`
  height: 80px;
  width: 140px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 15px;
  margin-right: 15;
  border: 2px solid ${props => props.selected ? Colors.secondary : Colors.primary};
  background-color: ${props => props.selected ? Colors.secondary : Colors.backgroundGray};
  /* flex: ${props => props.full ? 1 : 0}; */
  padding: 5px 5px;
`

export const SelectedCardName = styled.Text`
  font-family: 'Nunito Semi Bold';
  margin-top: 10px;
  font-size: 10px;
  color: ${props => props.selected ? Colors.white : Colors.primary};
  font-weight: bold;
`

export const InputError = styled.Text`
  font-family: 'Nunito Regular';
  font-size: 10;
  color: ${props => props.error ? Colors.error : 'transparent'};
`

export const CardImage = styled.Image`
  width: 40px;
  height: 40px;
`
