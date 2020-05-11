import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const ModalContainer = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: rgb(48, 49, 51);
`

export const ModalIconContainer = styled.View`
  align-self: flex-start;
  position: absolute;
  padding-left: 12px;
  flex-direction: row;
  align-items: flex-end;
  padding-top: 12px;
  width: ${Dimensions.get('window').width};
`

export const CloseButton = styled(Icon)`
  shadow-offset: {width: 0, height: 1 }; 
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 0;
  elevation: 4;
`

export const CarouselContainer = styled.View`
  flex: 1;
  width: ${Dimensions.get('window').width};
  align-items: center;
  align-self: center;
  height: 407px;
`

export const CarouselFooterContainer = styled.View`
  position: absolute;
  bottom: 40px;
  flex-direction: ${props => props.rowReverse ? 'row-reverse' : 'row' };
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
`

export const Slide = styled(FastImage)`
  height: 407px;
  min-height: 407px;
  min-width: ${Dimensions.get('window').width};
  width: ${Dimensions.get('window').width};
`

export const styles = StyleSheet.create({
  scrollContainerStyles: {
    paddingBottom: 40
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    marginLeft: -8,
    backgroundColor: Colors.secondary
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 4,
    marginHorizontal: 0,
    backgroundColor: 'rgb(238, 238,242)'
  },
  dotContainerStyle: {
    marginRight: 4,
  },
  paginationContainerStyle: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: 8,
    alignSelf: 'flex-end'
  },
})
