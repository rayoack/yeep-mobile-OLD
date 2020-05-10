import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const ListLoadingContainer = styled.View`
  flex: 1;
  /* background-color: ${Colors.blackTransparent}; */
  align-items: center;
  justify-content: center;
`

export const ListLoadingIndicator = styled.ActivityIndicator`
  color: ${Colors.primary};
  font-size: 30px;
  align-self: center;
`

export const ListLoadingText = styled.Text`
  font-size: 15px;
  font-family: 'Nunito Semi Bold';
  color: ${Colors.primary};
`