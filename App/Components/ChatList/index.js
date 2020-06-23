import React, { useState } from 'react';
import { Images, Colors } from 'App/Theme'

import Feedback from '../Feedback'
import ListLoading from '../ListLoading'
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
  ChatTitle,
  CardSubTitle,
  CardDescription,
  ChatReadFeedbackContainer,
  ChatReadFeedback
} from './styles';


const ChatList = ({
  data,
  onPress,
  loading,
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
            return (
              <CardContainer
                onPress={() => onPress(item.id)}
                activeOpacity={0.7}
              >
                {!item.read ? 
                  <ChatReadFeedbackContainer>
                    <ChatReadFeedback/>
                  </ChatReadFeedbackContainer>  
                : null}
                {item.image.length ? (
                  <CardImage source={{ uri: item.image }}/>
                ) : (
                  <CardImage source={Images.image_background}/>
                )}
  
                <CardTextContainer>
                  <ChatTitle>{item.title}</ChatTitle>
                  <CardSubTitle>{item.subInfo}</CardSubTitle>
                </CardTextContainer>
              </CardContainer>
            )
          }}
          ListEmptyComponent={() => {
            return (
              <Feedback feedbackType={'chat_empty'}/>
            )
          }}
        />
      )}
    </>
  );
}

ChatList.defaultProps = {
  data: [],
  onPress: () => null,
  loading: false,
  onRefresh: () => null,
  refreshing: false
}

export default ChatList;