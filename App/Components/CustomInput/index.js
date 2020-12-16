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
  fontSize,
  marginRight,
  marginLeft,
  isMasked,
  editable,
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
          fontSize={fontSize}
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
          editable={editable}
        >{value}</MaskedInputContainer>
      ) : (
        <InputContainer
          // value={value}
          height={height}
          width={width}
          onChangeText={onChangeText}
          placeholder={placeholder}
          fontSize={fontSize}
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
          editable={editable}
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
  fontSize: '16px',
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
  mask: null,
  editable: true
}

export default CustomInput;