import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`

`

export const ViewContainer = styled.View`
  flex: 1;
  padding: 0 20px;
  margin-bottom: 20px;
`

export const TopCotainer = styled.View`
  margin-bottom: 20px;
`

export const EventCoverContainer = styled.TouchableOpacity`
  margin-bottom: 40px;
  border-radius: 5px;
`

export const EventCover = styled(FastImage)`
  height: 150px;
  width: 300px;
  border-radius: 5px;
`

export const DeleteEventCoverContainer = styled.TouchableOpacity`
  /* margin-bottom: 40px; */
  position: absolute;
  right: 20;
  z-index: 99;
  align-self: flex-end;
  padding: ${props => props.padding ? props.padding : '10px'};
  flex-direction: row;
  align-items: center;
`

export const DeleteEventCoverIcon = styled(FastImage)`
  height: 30px;
  width: 30px;
`

export const DeleteEventImageContainer = styled.TouchableOpacity`
  /* margin-bottom: 40px; */
  position: absolute;
  right: 10;
  z-index: 99;
  align-self: flex-end;
  padding: 10px;
  align-items: center;
`

export const DeleteEventImageIcon = styled(FastImage)`
  height: 20px;
  width: 20px;
`

export const EventStepLabel = styled.Text`
  font-family: 'Nunito Bold';
  font-size: 20px;
  color: ${Colors.labelGray};
  margin-bottom: 4px;
`

export const EventStepText = styled.Text`
  font-family: 'Nunito Regular';
  font-size: 16px;
  color: ${Colors.labelGray};
  margin-bottom: 15px;
`

export const EventImagesContainer = styled.ScrollView`
  margin-bottom: 20px;
`

export const EventImageButtonContainer = styled.TouchableOpacity``

export const EventImages = styled(FastImage)`
  height: 140px;
  width: 140px;
  margin: 5px 10px 0 0;
  border-radius: 2px;
`

export const DateContainer = styled.View``

export const HoursContainer = styled.View`
  flex-direction: row;
`