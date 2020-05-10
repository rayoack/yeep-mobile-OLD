import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 250px;
  align-self: center;
`;

export const FeedbackImage = styled(FastImage)`
  margin-top: 100px;
  height: ${props => props.feedbackType == 'coming_soon' ? 300 : 150};
  width: 250px;
`

export const FeedbackText = styled.Text`
  font-size: ${props => props.feedbackType == 'coming_soon' ? 40 : 30};
  text-align: center;
  font-family: 'Nunito Semi Bold';
  margin-top: 20px;
  color: ${Colors.labelBlack};
`