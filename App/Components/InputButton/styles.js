import styled from 'styled-components/native'
import { Colors } from 'App/Theme'

export const ContainerButton = styled.TouchableOpacity`
`

export const SelectionInputContainer = styled.View`
  flex: 1;
  margin-bottom: 16px;
  opacity: ${props => props.editable ? 1 : 0.4};
`

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ECECEC;
  padding-right: 5px;
  border: 1px solid rgb(218, 218, 218);
  border-radius: 4px;
  height: 36px;
`

export const DisableContainer = styled.View`
  background-color: rgba(255,255,255,0.3);
`

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'Nunito Regular';
  padding: 0 15px;
  font-size: 14px;
  height: 36px;
  color: ${Colors.labelBlack};
  border: 0px;
`
export const InputLabel = styled.Text`
  font-family: 'Nunito Regular';
  font-size: 14;
  color: ${Colors.labelBlack};
  margin-bottom: 8px;
`

export const InputError = styled.Text`
  font-family: 'Nunito Regular';
  font-size: 12;
  line-height: 12;
  letter-spacing: 0;
  color: ${props => props.error ? colors.errorFont : 'transparent'};
  padding-top: 8px;
`
