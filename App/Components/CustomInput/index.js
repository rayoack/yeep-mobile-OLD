import React from 'react';
import { View } from 'react-native';

import { InputLabel, InputContainer, ErrorText, InputText } from './styles';

const CustomInput = ({
  label,
  text,
  value,
  onChangeText,
  placeholder,
  onBlur,
  onFocus,
  marginTop,
  marginBottom,
  keyboardType,
  secureTextEntry,
  multiline,
  error,
  errorText,
  autoCapitalize
}) => {
  return (
    <>
      {label ? (
        <InputLabel>{label}</InputLabel>
      ) : null}
      {text ?
        <InputText>{text}</InputText>
      : null}
      <InputContainer
        // value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}      
        marginTop={marginTop}
        marginBottom={marginBottom}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        error={error}
        autoCapitalize={autoCapitalize }
      >{value}</InputContainer>

      {error ?
        <ErrorText
          marginBottom={marginBottom}
          error={error}  
        >{errorText}</ErrorText>
      : null}
    </>
  );
}

CustomInput.defaultProps = {
  value: '',
  text: '',
  onChangeText: () => {},
  placeholder: '',
  onBlur: () => {},
  onFocus: () => {},
  marginTop: 0,
  marginBottom: 0,
  keyboardType: 'default',
  secureTextEntry: false,
  multiline: false,
  error: false,
  errorText: '',
  autoCapitalize: 'sentences'
}

export default CustomInput;