import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from 'App/Theme'

export const CardContainer = styled.TouchableOpacity`
  min-height: 330px;
  margin-bottom: 15px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
`;

export const CardImage = styled(FastImage)`
  height: 200px;
  width: 100%;
  border-radius: 5px;
`

export const CarouselContainer = styled.View`
  flex: 1;
  width: ${Dimensions.get('window').width};
  align-items: center;
  align-self: center;
`

export const CarouselFooterContainer = styled.View`
  position: absolute;
  bottom: 15px;
  right: 10px;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
`

export const SlideCountContainer = styled.View`
  height: 40px;
  width: 50px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${Colors.lightSecondaryTransparent};
  box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.32);
  elevation: 10;
`

export const SlideCount = styled.Text`
  font-size: 12px;
  font-family: 'Nunito Bold';
  color: ${Colors.white};
`

export const CardInfoContainer = styled.View`
`;

export const CardTitle = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  font-family: 'Nunito Bold';
  color: ${Colors.labelBlack};
`

export const CardSubTitle = styled.Text`
  font-size: 14px;
  font-family: 'Nunito Regular';
  color: ${Colors.textDefault};
  width: 300px;
`

export const CardSubInfoContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`

export const RigthSubInfoContainer = styled.View`
  height: 40px;
  min-width: 90px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.lightBlue};
  padding-right: 20px;
  justify-content: space-between;
`

export const RigthIconContainer = styled.View`
  height: 40px;
  width: 40px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  background-color: ${Colors.saintBlue};
`

export const LeftSubInfoContainer = styled.View`
  height: 40px;
  min-width: 100px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.secondary};
  padding-right: 20px;
  justify-content: space-between;
`

export const LeftIconContainer = styled.View`
  height: 40px;
  width: 40px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  background-color: ${Colors.primary};
`

export const Icon = styled.Image`
  height: 20px;
  width: 20px;
`;

export const CardSubInfoText = styled.Text`
  font-size: 12px;
  font-family: 'Nunito Bold';
  color: ${Colors.white};
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
