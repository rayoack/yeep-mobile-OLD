import React from 'react';
import { View } from 'react-native';
import { Colors } from 'App/Theme'

import { ListLoadingContainer, ListLoadingIndicator } from './styles';

const ListLoading = () => {
  return (
    <ListLoadingContainer>
      <ListLoadingIndicator color={Colors.primary} size={60}/>
    </ListLoadingContainer>
  );
}

export default ListLoading;