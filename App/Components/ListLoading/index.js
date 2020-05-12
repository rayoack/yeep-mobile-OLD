import React from 'react';
import { View } from 'react-native';
import { Colors } from 'App/Theme'
import { translate } from '../../Locales'

import { ListLoadingContainer, ListLoadingIndicator, ListLoadingText } from './styles';

const ListLoading = () => {
  return (
    <ListLoadingContainer>
      <ListLoadingIndicator color={Colors.secondary} size={60}/>
      <ListLoadingText>{translate('loadingText')}</ListLoadingText>
    </ListLoadingContainer>
  );
}

export default ListLoading;