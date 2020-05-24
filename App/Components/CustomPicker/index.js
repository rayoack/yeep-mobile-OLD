import React from 'react';

import { Container, SelectPicker, PickerLabel, ErrorText, PickerText } from './styles'

const CustomPicker = ({
  actualValue,
  onValueChange,
  values,
  fullWidth,
  labelSize,
  label,
  marginTop,
  marginBottom,
  error,
  errorText,
  text,
}) => {
  return (
    <Container>
      {label ?
        <PickerLabel labelSize={labelSize}>{label}</PickerLabel>
      : null}
      {text ?
        <PickerText>{text}</PickerText>
      : null}
      <SelectPicker
        selectedValue={actualValue}
        error={error}
        onValueChange={value => onValueChange(value)}
        fullWidth={fullWidth}
        marginTop={marginTop}
        marginBottom={marginBottom}
      >
        {values.map(item => (
          <SelectPicker.Item label={item.title} value={item.value} />
        ))}
      </SelectPicker>
      
      {error ?
        <ErrorText
          marginBottom={marginBottom}
          error={error}  
        >{errorText}</ErrorText>
      : null}
    </Container>
  );
};

CustomPicker.defaultProps = {
  actualValue: '',
  label: '',
  text: '',
  values: [],
  error: false,
  errorText: '',
  fullWidth: false,
  marginTop: 0,
  marginBottom: 0,
  labelSize: 20
}

export default CustomPicker;