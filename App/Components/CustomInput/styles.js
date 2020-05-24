import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const InputLabel = styled.Text`
  font-size: ${props => props.labelSize};
  text-align: left;
  font-family: 'Nunito Bold';
  color: ${Colors.labelBlack};
`

export const InputText = styled.Text`
  text-align: left;
  font-family: 'Nunito Regular';
  font-size: 16px;
  color: #373A42;
  margin-bottom: 10px;
`

export const InputContainer = styled.TextInput`
  width: ${props => props.width ? props.width : '290px'};
  height: ${props => props.height ? props.height : '50px'};
  border-radius: 10px;
  padding: 14px;
  margin-right: ${props => props.marginRight};
  margin-left: ${props => props.marginLeft};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => !props.error ? props.marginBottom : 0};
  background-color: #ECECEC;
  color: #999999;
  text-align-vertical: ${props => props.multiline ? 'top' : 'center'};
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
  align-self: flex-start;
`
