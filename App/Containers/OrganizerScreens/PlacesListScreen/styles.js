import styled from 'styled-components/native';
import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
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

export const ActiveFiltersContainer = styled.ScrollView`
  max-height: 40px;
  margin-top: 20px;
`

export const ActiveFiltersBox = styled.View`
  min-width: 60px;
  height: 40px;
  border-width: 2px;
  border-color: ${Colors.primary};
  background-color: ${Colors.primary};
  border-radius: 10px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  padding-right: 8px;
`

export const ActiveFiltersText = styled.Text`
  font-size: 18px;
  font-family: 'Nunito Semi Bold';
  color: ${Colors.white};
`

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20
  }
});