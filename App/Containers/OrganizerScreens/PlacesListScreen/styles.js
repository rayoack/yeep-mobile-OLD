import styled from 'styled-components/native';
import { Colors } from 'App/Theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.backgroundGray};
`;

export const CardList = styled.FlatList`
  flex: 1;
  padding: 0 20px;
`

export const HeaderContainer = styled.View`
  margin: 10px 0;
  padding: 10px;
`;

export const ListTitle = styled.Text`
  font-size: 30px;
  font-family: 'Nunito Extra Bold';
  color: ${Colors.labelBlack};
`