import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Colors } from 'App/Theme'
import { translate } from '../../Locales'

// import { Container } from './styles';

const ReadMoreText = ({
  name,
  text,
  readMoreColor,
  readMoreSize,
  textColor,
  textSize,
}) => {
  const [textShow, setTextShow] = useState('')

  const toggleNumberOfLines = textName => {
    setTextShow(textShow === textName ? -1 : textName,)
  };

  return (
    <>
      <Text
        style={{ color: textColor, fontSize: textSize, marginBottom: 16 }}
        numberOfLines={textShow === name ? undefined : 3}>
        {text}
      </Text>
      {/* {name.length > 100 ? ( */}
        <Text
          onPress={() => toggleNumberOfLines(name)}
          style={{ color: readMoreColor, fontSize: readMoreSize }}>
          {textShow === name ? translate('readLess') : translate('readMore')}
        </Text>
      {/* ) : null} */}
    </>
  );
}

ReadMoreText.defaultProps = {
  name: '',
  text: '',
  readMoreColor: Colors.lightRed,
  readMoreSize: 15,
  textColor: Colors.textDefault,
  textSize: 15,
}

export default ReadMoreText;