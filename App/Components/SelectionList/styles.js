import styled from 'styled-components/native'
import { StyleSheet  } from 'react-native'
import { Colors } from 'App/Theme'
import FastImage from 'react-native-fast-image'

export const StyledFlatList = styled.FlatList`
  padding-right: 10px;
  margin-top: 10px;
`

export const ItemImage = styled(FastImage)`
  width: 70px;
  height: 40px;
  border-radius: 5px;
  margin-right: 10px;
`

export const ImageContainer = styled.View`
  height: 43px;
  height: 29px;
`

export const Touchable = styled.TouchableOpacity``

export const LabelContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  height: 80px;
  margin-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.ligthGray};
`

export const NoBorderItem = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
  border-width: 0;
  justify-content: space-between;
`

export const LabelTextContainer = styled.View`
  width: 100%;
`

export const LabelTitle = styled.Text`
  font-family: ${props => props.isAddSupplierSelectionScreen ? 'Nunito Semi Bold' : 'Nunito Regular'};
  font-size: 20px;
  color: ${Colors.labelBlack};
  margin-bottom: ${props => props.isGroupDetails ? 8 : 0};
`

export const LabelDescription = styled.Text`
  width: 80%;
  font-family: 'Nunito Regular';
  font-size: 14px;
  line-height: 14px;
  color: ${Colors.textDefault};
`

export const styles = StyleSheet.create({
  selectionIcon: {
    width: 24, height: 24 
  },
  retangularThumbnail: {
    width: 43, 
    height: 29,
    marginRight: 8
  },
  avatar: {
    width: 44, 
    height: 44,
    borderRadius: 22,
    marginRight: 11
  },
  listContentContainerStyle: { 
    paddingBottom: 50
  }
})