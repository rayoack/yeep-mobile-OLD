import React, { useState } from 'react';
import { Images, Colors } from 'App/Theme'

import Feedback from '../Feedback'
import ListLoading from '../ListLoading'
import CardWithImage from '../CardWithImage'
import { translate } from '../../Locales'

import {
  AnimationLoading
} from '../index'

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
        <AnimationLoading
          loading={loading}/>
      ) : (
        <List
          data={data}
          onRefresh={() => onRefresh()} 
          refreshing={refreshing}
          renderItem={({item}) => {
            item.leftIcon = Images.confettiWhite;
            item.leftInfo = translate(item.category);
            item.text = (item.dates.length || item.dates) && item.dates[0].normalizedDate ?
              `${translate('startDay')} ${translate('in')} ${item.dates[0].normalizedDate}` :
              translate('noDateEventsLabel');
            item.images = [{ url: item.image }]
            console.log(item.dates)
            return (
              // <CardContainer
              //   onPress={() => onPress(item.id)}
              //   activeOpacity={0.7}
              // >
              //   {item.image.length ? (
              //     <CardImage source={{ uri: item.image }}/>
              //   ) : (
              //     <CardImage source={Images.image_background}/>
              //   )}
  
              //   <CardTextContainer>
              //     <CardTitle>{item.title}</CardTitle>
              //     <CardSubTitle>{translate(item.category)}</CardSubTitle>
              //     <CardDescription>{item.adress}</CardDescription>
              //     <CardDescription>{item.final_adress}</CardDescription>
              //   </CardTextContainer>
              // </CardContainer>
              <CardWithImage
                item={item}
                onCardPress={() => onPress(item.id)}
              />
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