import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  flex: 1;
  width: ${Dimensions.get('window').width};
  padding: 20px;
  background-color: ${Colors.backgroundGray};
  /* margin-bottom: 80px; */
`;

export const RowContainer = styled.View`
  padding-bottom: 20px;
  margin: 10px 0;
  flex-direction: row;
  width: ${Dimensions.get('window').width};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
`

export const LocationContainer = styled.View`
  margin: 10px 0;
  padding-bottom: 20px;
  width: ${Dimensions.get('window').width};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
`

export const QueryLabel = styled.Text`
  font-size: 20px;
  font-family: 'Nunito Bold';
  color: ${Colors.labelBlack};
  background-color: ${props => props.loading ? Colors.ligthGray2 : Colors.backgroundGray};
`

export const SearchButtonContainer = styled(LinearGradient)`
  position: absolute;
  z-index: 99;
  bottom: 0;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  width: ${Dimensions.get('window').width};
`