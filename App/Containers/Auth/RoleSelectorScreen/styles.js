import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 60px;
  padding-right: 60px;
  background-color: ${Colors.primary};
`;

export const SelectorTitleContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 30px;
`

export const SelectorTitle = styled.Text`
  font-size: 30px;
  font-family: 'Nunito Regular';
  color: #fff;
  text-align: center;
`

export const RoleContainer = styled.TouchableOpacity`
  width: 300px;
  height: 500px;
  border-radius: 10px;
`

export const RoleImage = styled(FastImage)`
  width: 300px;
  height: 500px;
  border-radius: 10px;
`

export const RoleTextContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 300px;
  height: 190px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 35px 20px;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

export const RoleTitle = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${Colors.primary};
  font-family: 'Nunito Bold';
  margin-bottom: 5px;
`

export const RoleDescription = styled.Text`
  font-size: 13px;
  color: ${Colors.white};
  font-family: 'Nunito Regular';
`