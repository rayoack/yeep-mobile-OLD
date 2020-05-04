import React from 'react';
import { View } from 'react-native';

import { ButtonContainer, ButtonText } from './styles';

const ButtonWithBackground = ({
  onPress,
  text,
  backgroundColor,
  textColor
}) => {
  return (
    <ButtonContainer
      onPress={() => onPress()}
      backgroundColor={backgroundColor}
    >
      <ButtonText textColor={textColor}>{text}</ButtonText>
    </ButtonContainer>
  );
}

ButtonWithBackground.defaultProps = {
  onPress: () => {},
  text: '',
  backgroundColor: '#8965A3',
  textColor: '#fff',
}

export default ButtonWithBackground;