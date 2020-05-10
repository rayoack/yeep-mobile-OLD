import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const ListLoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const ListLoadingIndicator = styled.ActivityIndicator`
  color: ${Colors.primary};
  font-size: 30px;
  align-self: center;
`