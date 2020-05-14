import React, { useState } from 'react';
import { Images, Colors } from 'App/Theme'

import Feedback from '../Feedback'
import ListLoading from '../ListLoading'
import { translate } from '../../Locales'

import {
  Container,
  CardListLoadingContainer,
  CardListLoading,
  List,
  CardContainer,
  CardImage,
  CardTextContainer,
  CardTitle,
  CardSubTitle,
  CardDescription
} from './styles';


const CardsList = ({
  data,
  onPress,
  loading,
  emptyType,
  onRefresh,
  refreshing
}) => {
  return (
    <>
      {loading ? (
        <ListLoading />
      ) : (
        <List
          data={data}
          onRefresh={() => onRefresh()} 
          refreshing={refreshing}
          renderItem={({item}) => {
            return (
              <CardContainer
                onPress={() => onPress(item.id)}
                activeOpacity={0.7}
              >
                {item.image.length ? (
                  <CardImage source={{ uri: item.image }}/>
                ) : (
                  <CardImage source={Images.image_background}/>
                )}
  
                <CardTextContainer>
                  <CardTitle>{item.title}</CardTitle>
                  <CardSubTitle>{translate(item.category)}</CardSubTitle>
                  <CardDescription>{item.adress}</CardDescription>
                  <CardDescription>{item.final_adress}</CardDescription>
                </CardTextContainer>
              </CardContainer>
            )
          }}
          ListEmptyComponent={() => {
            return (
              <Feedback feedbackType={emptyType}/>
            )
          }}
        />
      )}
    </>
  );
}

CardsList.defaultProps = {
  data: [],
  onPress: () => null,
  loading: false,
  emptyType: 'empty',
  onRefresh: () => null,
  refreshing: false
}

export default CardsList;