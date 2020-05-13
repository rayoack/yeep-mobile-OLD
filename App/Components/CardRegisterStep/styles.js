import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  min-height: 90px;
  margin: 10px 20px 0;
  margin-bottom: ${props => props.final ? '30px': 0};
  background-color: ${Colors.white};
  border-radius: 5px;
  box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.32);
  elevation: 10;
`;

export const CardInfoContainer = styled.View`
  flex: 1;
  padding: 20px;
  border-right-width: ${props => props.completed ? '1px' : 0};
  border-right-color: ${Colors.grayTransparent};
`

export const CardInfoTitle = styled.Text`
  font-size: 16px;
  font-family: 'Nunito Semi Bold';
  color: ${Colors.labelBlack};
  text-align: left;
`

export const CardInfoText = styled.Text`
  font-size: 12px;
  font-family: 'Nunito Regular';
  color: ${Colors.textDefault};
  text-align: left;
`

export const CompletedIconContainer = styled.View`
  width: ${props => props.completed ? '80px' : 0};
  align-items: center;
  justify-content: center;
`

export const CompletedIcon = styled(FastImage)`
  height: 30px;
  width: 30px;
`