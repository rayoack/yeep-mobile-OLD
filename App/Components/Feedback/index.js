import React from 'react'
import { Images } from 'App/Theme'
import { translate } from '../../Locales'

import { Container, FeedbackImage, FeedbackText } from './styles';

const setFeedbackImage = (feedbackType) => {
  switch (feedbackType) {
    case 'not_found':
      return Images.not_found
      break;
  
    case 'coming_soon':
      return Images.coming_soon
      break;
  
    case 'error':
      return Images.error
      break;
  
    case 'no_events_with_dates':
      return Images.calendarIllustration
      break;
  
    case 'chat_empty':
      return Images.conversationIllustration
      break;
  
    default:
      return Images.empty
      break;
  }
}

const setFeedbackText = (feedbackType) => {
  switch (feedbackType) {
    case 'not_found':
      return translate('notFoundFeedback')
      break;
  
    case 'coming_soon':
      return translate('comingSoonFeedback')
      break;
  
    case 'error':
      return translate('errorFeedback')
      break;
  
    case 'organizer_empty':
      return translate('organizerEmptyFeedback')
      break;
  
    case 'no_events_with_dates':
      return translate('noEventsWithDates')
      break;
  
    default:
      return translate('emptyFeedback')
      break;
  }
}

const Feedback = ({
  feedbackType
}) => {
  const feedbackImage = setFeedbackImage(feedbackType)
  const feedbackText = setFeedbackText(feedbackType)
  return (
    <Container>
      <FeedbackImage
        feedbackType={feedbackType}
        source={feedbackImage}
      />
      <FeedbackText feedbackType={feedbackType}>{feedbackText}</FeedbackText>
    </Container>
  );
}

Feedback.defaultProps = {
  feedbackType: 'empty'
}

export default Feedback;