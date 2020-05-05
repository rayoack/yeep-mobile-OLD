import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  width: 290px;
  height: 45px;
  border-radius: 10px;
  background-color: ${props => props.backgroundColor};
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled ? 0.8 : 1}
`

export const ButtonText = styled.Text`
  color:  ${props => props.textColor};
  font-size: 14px;
  font-family: "Nunito Extra Bold"
`