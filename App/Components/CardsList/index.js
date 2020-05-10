import React, { useState } from 'react';
import { Images, Colors } from 'App/Theme'

import Feedback from '../Feedback'

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
  emptyType
}) => {
  return (
    <>
      {loading ? (
        <CardListLoadingContainer>
          <CardListLoading color={Colors.primary} size={60}/>
        </CardListLoadingContainer>
      ) : (
        <List
          data={data}
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
                  <CardSubTitle>{item.category}</CardSubTitle>
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
  onPress: () => {},
  loading: false,
  emptyType: 'empty'
}

export default CardsList;