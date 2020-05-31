import React from 'react'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Images } from 'App/Theme'
import {
  Item,
  StyledFlatList,
  LabelContainer,
  NoBorderItem,
  styles,
  LabelTextContainer,
  LabelTitle,
  LabelDescription,
  Touchable
} from './styles'
import selectedIconSrc from '../../assets/images/selected-icon-round.png'
import deselectedIconSrc from '../../assets/images/deselected-icon-round.png'

const ViewComponent = ({
  items,
  onItemPress,
  multipleSelection,
  itemLayout,
  ListEmptyComponent,
  scrollEnabled,
  supplierList,
  deleteItem,
  isAddSupplierSelectionScreen,
  renderItem,
  isGroupDetails
}) => {
  return (
    <StyledFlatList
      contentContainerStyle={styles.listContentContainerStyle}
      data={items}
      scrollEnabled={scrollEnabled}
      supplierList={supplierList}
      renderItem={({ item, index }) => {
        const itemProps = {
          itemLayout,
          multipleSelection,
          onItemPress,
          deleteItem,
          item,
          supplierList,
          isAddSupplierSelectionScreen,
          isGroupDetails
        }

        return typeof renderItem == 'function' ? (
          renderItem({ item, index })
        ) : (
          <ListItem {...itemProps} />
        )
      }}
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={(item, index) => String(index + 1)}
    />
  )
}

const ListItem = ({
  item,
  onItemPress,
  multipleSelection,
  itemLayout,
  supplierList,
  deleteItem,
  isAddSupplierSelectionScreen,
  isGroupDetails
}) => {
  switch (itemLayout) {
    case 'avatar':
      return (
        <AvatarItem
          item={item}
          onItemPress={onItemPress}
          multipleSelection={multipleSelection}
          isAddSupplierSelectionScreen={isAddSupplierSelectionScreen}
          isGroupDetails={isGroupDetails}
        />
      )

    default:
      return (
        <RegularItem
          item={item}
          deleteItem={deleteItem}
          onItemPress={onItemPress}
          multipleSelection={multipleSelection}
          supplierList={supplierList}
        />
      )
  }
}

const RegularItem = ({
  item,
  onItemPress,
  multipleSelection,
  supplierList,
  deleteItem
}) => {
  return (
    <Touchable onPress={() => onItemPress(item)} activeOpacity={0.5}>
      <Item>
        <LabelContainer>
          {item.image && (
            <FastImage
              style={styles.retangularThumbnail}
              source={{ uri: item.image }}
            />
          )}
          <LabelTitle supplierList={supplierList} numberOfLines={1}>
            {item.label}
          </LabelTitle>
        </LabelContainer>
        {multipleSelection && <SelectionIcon selected={item.selected} />}
        {typeof deleteItem == 'function' && (
          <Touchable onPress={() => deleteItem(item)}>
            <Icon name={'window-close'} size={20} />
          </Touchable>
        )}
      </Item>
    </Touchable>
  )
}

const AvatarItem = ({
  item,
  onItemPress,
  multipleSelection,
  isAddSupplierSelectionScreen,
  isGroupDetails
}) => {
  return (
    <Touchable onPress={() => onItemPress(item)} activeOpacity={0.5}>
      <NoBorderItem>
        <LabelContainer>
          <FastImage style={styles.avatar} source={item.image} />
          <LabelTextContainer>
            <LabelTitle
              isAddSupplierSelectionScreen={isAddSupplierSelectionScreen}
              numberOfLines={1}
              isGroupDetails={isGroupDetails}
            >
              {item.label}
            </LabelTitle>
            {isGroupDetails ? (
              <LabelDescription isGroupDetails={isGroupDetails}>
                {item.email}
              </LabelDescription>
            ) : null}
          </LabelTextContainer>
        </LabelContainer>
        {multipleSelection && <SelectionIcon selected={item.selected} />}
      </NoBorderItem>
    </Touchable>
  )
}

const SelectionIcon = ({ selected }) => {
  return selected ? (
    <FastImage style={styles.selectionIcon} source={Images.check_mark} />
  ) : (
    <FastImage style={styles.selectionIcon} source={Images.button_remove} />
  )
}

export default ViewComponent
