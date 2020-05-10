import React from 'react';

import { ArrowBack } from './styles';

const BackButton = ({
  size,
  color,
  paddingTop
}) => {
  return (
    <ArrowBack
      name={'arrow-left'}
      size={size}
      color={color}
      paddingTop={paddingTop}
    />
  );
}

BackButton.defaultProps = {
  size: 20,
  color: '#fff',
  paddingTop: 0
}

export default BackButton;