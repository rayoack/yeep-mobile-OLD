import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.backgroundGray};
`;

export const EventDivider = styled.View`
  width: ${Dimensions.get('window').width};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
  margin: 5px 0;
  margin-bottom: ${props => props.final ? '100px' : "5px"};
`

export const EventIcon = styled(FastImage)`
  height: 20px;
  width: 20px;
  margin-right: 10px;
`

export const EventCover = styled(FastImage)`
  height: 200px;
  width: ${Dimensions.get('window').width};
  background-color: ${Colors.ligthGray2};
  margin-bottom: 15px;
`

export const EventActionContainer = styled.TouchableOpacity`
  height: 60px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${Dimensions.get('window').width};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
`

export const EventActionLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const EventActionLabel = styled.Text`
  font-size: 16px;
  font-family: 'Nunito Semi Bold';
  color: ${Colors.labelBlack};
`

export const EventActionIcon = styled(FastImage)`
  height: 30px;
  width: 30px;
  margin-right: 20px;
`

export const EventRowContainer = styled.View`
  flex-direction: row;
  width: 250px;
  margin-bottom: 5px;
  align-items: center;
`

export const EventHeader = styled.View`
  position: absolute;
  top: 0;
  z-index: 99;
  margin-top: 10px;
  padding: 20px;
  height: 50px;
  justify-content: center;
  border-bottom-left-radius: 30px;
  /* background-color: ${Colors.white}; */
  width: ${Dimensions.get('window').width};
`

export const BackButtonContainer = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  background-color: ${Colors.lightSecondaryTransparent};
`

export const EventContainer = styled.View`
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: ${props => props.loading ? '20px' : 0};
`

export const EventTitle = styled.Text`
  font-size: 35px;
  font-family: 'Nunito Extra Bold';
  width: 200px;
  margin-bottom: 10px;
  color: ${Colors.labelBlack};
  background-color: ${props => props.loading ? Colors.ligthGray2 : Colors.backgroundGray};
`

export const EventLabel = styled.Text`
  font-size: 20px;
  font-family: 'Nunito Bold';
  width: 100px;
  color: ${Colors.labelBlack};
  background-color: ${props => props.loading ? Colors.ligthGray2 : Colors.backgroundGray};
`

export const EventText = styled.Text`
  font-size: 14px;
  color: ${Colors.textDefault};
`

export const EventSubText = styled.Text`
  font-size: 11px;
  width: 270px;
  margin: -8px 0 10px 30px;
  color: ${Colors.ligthGray2};
`

export const EventImagesContainer = styled.ScrollView`
  margin-bottom: 20px;
`

export const EventImageButtonContainer = styled.TouchableOpacity``

export const EventImages = styled(FastImage)`
  height: 120px;
  width: 120px;
  margin: 5px 10px 0 0;
  border-radius: 2px;
`