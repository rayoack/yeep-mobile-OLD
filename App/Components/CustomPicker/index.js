import React from 'react';

import { Container, SelectPicker, PickerLabel, ErrorText } from './styles'

const CustomPicker = ({
  actualValue,
  onValueChange,
  values,
  fullWidth,
  label,
  marginTop,
  marginBottom,
  error,
  errorText,
}) => {
  return (
    <Container>
      {label ?
        <PickerLabel>{label}</PickerLabel>
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
  values: [],
  error: false,
  errorText: '',
  fullWidth: false,
  marginTop: 0,
  marginBottom: 0,
}

export default CustomPicker;