import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.View`
  
`;

export const List = styled.FlatList`
  flex: 1;
`

export const CardContainer = styled.TouchableOpacity`
  height: 140px;
  padding: 40px 18px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
`

export const CardImage = styled(FastImage)`
  width: 105px;
  height: 93px;
  border-radius: 5px;
  margin-right: 17px;
`

export const CardTextContainer = styled.View`
  align-self: flex-end;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-family: 'Nunito Bold';
  color: ${Colors.labelBlack};
`

export const CardSubTitle = styled.Text`
  font-size: 14px;
  font-family: 'Nunito Regular';
  color: ${Colors.primary};
`

export const CardDescription = styled.Text`
  font-size: 14px;
  font-family: 'Nunito Semi Bold';
  color: ${Colors.ligthGray2};
`