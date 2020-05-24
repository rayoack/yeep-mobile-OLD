import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const ModalContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: ${Colors.whiteTransparent};
`

export const AnimationContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const LoadingLabel = styled.Text`
  font-family: 'Nunito Extra Bold';
  font-size: ${props => props.fullscreen ? '40px' : '25px'};
  margin-top: ${props => props.fullscreen ? '40px' : 0};
  text-align: center;
  color: ${Colors.labelBlack};
  margin-bottom: 4px;
`