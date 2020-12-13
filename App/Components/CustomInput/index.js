import React from 'react';
import { View } from 'react-native';

import { InputLabel, InputContainer, ErrorText, InputText, MaskedInputContainer } from './styles';

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
  autoCapitalize,
  height,
  width,
  labelSize,
  marginRight,
  marginLeft,
  isMasked,
  mask
}) => {
  return (
    <View>
      {label ? (
        <InputLabel labelSize={labelSize}>{label}</InputLabel>
      ) : null}
      {text ?
        <InputText>{text}</InputText>
      : null}

      {isMasked ? (
        <MaskedInputContainer
          // value={value}
          height={height}
          width={width}
          onChangeText={onChangeText}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}      
          marginTop={marginTop}
          marginBottom={marginBottom}
          marginRight={marginRight}
          marginLeft={marginLeft}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          error={error}
          autoCapitalize={autoCapitalize}
          mask={mask}
        >{value}</MaskedInputContainer>
      ) : (
        <InputContainer
          // value={value}
          height={height}
          width={width}
          onChangeText={onChangeText}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}      
          marginTop={marginTop}
          marginBottom={marginBottom}
          marginRight={marginRight}
          marginLeft={marginLeft}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          error={error}
          autoCapitalize={autoCapitalize }
        >{value}</InputContainer>
      )}

      {error ?
        <ErrorText
          marginBottom={marginBottom}
          error={error}  
        >{errorText}</ErrorText>
      : null}
    </View>
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
  autoCapitalize: 'sentences',
  height: '',
  width: '',
  labelSize: 20,
  marginRight: 0,
  marginLeft: 0,
  isMasked: false,
  mask: null
}

export default CustomInput;