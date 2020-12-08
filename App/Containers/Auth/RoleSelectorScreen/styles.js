import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  flex: 1;
  /* align-items: center; */
  background-color: ${Colors.backgroundGray};
`;

export const SelectorTitleContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 30px;
`

export const SelectorTitle = styled.Text`
  font-size: 30px;
  font-family: 'Nunito Regular';
  color: ${Colors.primary};
  text-align: center;
`

export const RoleContainer = styled.TouchableOpacity`
  width: 340px;
  height: 170px;
  border-radius: 5px;
  elevation: 1;
  background-color: ${Colors.white};
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
`

export const RoleImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 5px;
`

export const RoleTextContainer = styled.View`
  width: 200px;
  height: 190px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`

export const RoleTitle = styled.Text`
  font-size: 14px;
  text-align: center;
  color: ${Colors.primary};
  font-family: 'Nunito Bold';
  margin-bottom: 5px;
`

export const RoleDescription = styled.Text`
  font-size: 13px;
  text-align: center;
  color: ${Colors.textDefault};
  font-family: 'Nunito Regular';
`