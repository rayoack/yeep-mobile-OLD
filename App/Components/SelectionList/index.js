import React, { Component } from 'react'
import ViewComponent from './ViewComponent'

class SelectionList extends Component {

  render() {
    return(
      <ViewComponent
        itemLayout={this.props.itemLayout}
        multipleSelection={this.props.multipleSelection}
        onItemPress={this.props.onItemPress}
        items={this.props.items}
        ListEmptyComponent={this.props.ListEmptyComponent}
        scrollEnabled={this.props.scrollEnabled}
        supplierList={this.props.supplierList}
        deleteItem={this.props.deleteItem}
        isAddSupplierSelectionScreen={this.props.isAddSupplierSelectionScreen}
        renderItem={this.props.renderItem}
        isGroupDetails={this.props.isGroupDetails}
      />
    )
  }
}

SelectionList.defaultProps = {
  items: [],
  multipleSelection: false,
  onItemSelection: () => {},
  renderItem: null,
  ListEmptyComponent: null,
  supplierList: false,
  deleteItem: false,
  isAddSupplierSelectionScreen: false,
  isGroupDetails: false
}

export default SelectionList