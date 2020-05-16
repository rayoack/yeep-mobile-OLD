import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
`

export const ViewContainer = styled.View`
  padding: 0 20px;
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
  padding: 10px;
  flex-direction: row;
  align-items: center;
`

export const DeleteEventCoverIcon = styled(FastImage)`
  height: 30px;
  width: 30px;
`

export const EventCoverLabel = styled.Text`
  font-family: 'Nunito Bold';
  font-size: 20px;
  color: #373A42;
  margin-bottom: 4px;
`

export const EventCoverText = styled.Text`
  font-family: 'Nunito Regular';
  font-size: 16px;
  color: #373A42;
  margin-bottom: 15px;
`
