import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const Container = styled.ScrollView`
`

export const ViewContainer = styled.View`
  align-items: center;
  padding: 0 20px;
`

export const EventCoverContainer = styled.TouchableOpacity``

export const EventCover = styled(FastImage)`
  height: 200px;
  width: 200px;
`