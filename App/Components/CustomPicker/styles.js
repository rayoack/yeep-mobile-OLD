import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';
import { Colors } from 'App/Theme'

export const Container = styled.View`
`;

export const SelectPicker = styled(Picker)`
  height: 50px;
  border-radius: 10px;
  font-family: 'Nunito Bold';
  color: ${Colors.labelBlack};
  padding: 14px;
  width: ${props => props.fullWidth ? '100%' : '290'};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => !props.error ? props.marginBottom : 0};
  background-color: ${Colors.ligthGray};
`

export const PickerLabel = styled.Text`
  font-family: 'Nunito Bold';
  font-size: ${props => props.labelSize ? props.labelSize : '20px'};
  color: ${Colors.labelBlack};
  margin-bottom: 4px;
`

export const PickerText = styled.Text`
  font-family: 'Nunito Regular';
  font-size: 16px;
  color: ${Colors.labelBlack};
  margin-bottom: 10px;
`

export const ErrorText = styled.Text`
  align-self: flex-start;
  margin-top: 2px;
  margin-bottom: ${props => props.error ? props.marginBottom : 0};
  font-size: 12px;
  font-family: 'Nunito Regular';
  color: ${Colors.error};
`