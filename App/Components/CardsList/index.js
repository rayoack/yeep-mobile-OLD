import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';

import {
  Container,
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
  onPress
}) => {

  return (
    <List
      data={data}
      renderItem={({item}) => {
        return (
          <CardContainer
            onPress={() => onPress(item.id)}
            activeOpacity={0.7}
          >
            <CardImage source={{ uri: item.image }}/>

            <CardTextContainer>
              <CardTitle>{item.title}</CardTitle>
              <CardSubTitle>{item.category}</CardSubTitle>
              <CardDescription>{item.adress}</CardDescription>
              <CardDescription>{item.final_adress}</CardDescription>
            </CardTextContainer>
          </CardContainer>
        )
      }}
    />
  );
}

CardsList.defaultProps = {
  data: [],
  onPress: () => {}
}

export default CardsList;