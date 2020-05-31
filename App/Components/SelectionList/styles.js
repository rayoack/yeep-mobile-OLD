import styled from 'styled-components/native'
import { StyleSheet  } from 'react-native'
import { Colors } from 'App/Theme'

export const StyledFlatList = styled.FlatList`
  padding-right: 10px;
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
  padding: 12px 0;
  height: 44px;
  margin-bottom: 8px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  border-bottom-width: 1;
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
  width: 80%;
  font-family: ${props => props.isAddSupplierSelectionScreen ? 'SFProText-Medium' : 'SFProText-Regular'};
  font-size: 16px;
  line-height: 16px;
  color: ${props => props.IconList ? 'rgb(141, 141, 143)' : 'rgb(48, 49, 51)'};
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