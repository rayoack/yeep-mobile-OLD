import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const ModalContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 40px;
  background-color: ${Colors.whiteTransparent};
`

export const SavingLoadingLabel = styled.Text`
  font-family: 'Nunito Bold';
  font-size: 20px;
  text-align: center;
  color: ${Colors.secondary};
  margin-bottom: 4px;
`