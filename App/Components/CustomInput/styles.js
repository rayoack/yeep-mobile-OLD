import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const InputContainer = styled.TextInput`
  width: 290px;
  height: 50px;
  border-radius: 10px;
  padding: 14px;
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => !props.error ? props.marginBottom : 0};
  background-color: #ECECEC;
  color: #999999;
  font-size: 16px;
  font-family: 'Nunito Regualr';
`;

export const ErrorText = styled.Text`
  align-self: flex-start;
  margin-top: 2px;
  margin-bottom: ${props => props.error ? props.marginBottom : 0};
  font-size: 12px;
  font-family: 'Nunito Regular';
  color: ${Colors.error};
`