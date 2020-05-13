import React from 'react';
import { Images } from 'App/Theme'

import {
  CardContainer,
  CardInfoContainer,
  CardInfoTitle,
  CardInfoText,
  CompletedIconContainer,
  CompletedIcon
} from './styles';

const CardRegisterStep = ({
  title,
  text,
  completed,
  onPress,
  final
}) => {
  return (
    <CardContainer final={final} onPress={() => onPress()} >
      <CardInfoContainer completed={completed}>
        <CardInfoTitle>{title}</CardInfoTitle>
        <CardInfoText>{text}</CardInfoText>
      </CardInfoContainer>

      <CompletedIconContainer completed={completed}>
        {completed ? <CompletedIcon source={Images.check_mark} /> : null}
      </CompletedIconContainer>
    </CardContainer>
  );
}

CardRegisterStep.defaultProps = {
  title: '',
  text: '',
  completed: false,
  final: false,
  onPress: () => null
}

export default CardRegisterStep;