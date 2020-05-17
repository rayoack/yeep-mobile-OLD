import React from 'react'
import { View } from 'react-native'
import {
  ContainerButton,
  Container,
  TextInput,
  InputLabel,
  SelectionInputContainer,
  InputError,
} from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from 'App/Theme'

const formatValue = (value) => {
  return !Array.isArray(value) ? value : 
    value.reduce(( previous, current) => {
      return previous + ', ' + current
    }, '').replace(/(^,)|(,$)/g, '')
}

const InputButton = ({
  onChangeText, 
  value, 
  placeholder, 
  label, 
  navigateTolist,
  iconSize,
  editable,
  error,
  errorMessage
}) => {
  const valueAsLabel = formatValue(value)
  return (
    <SelectionInputContainer
      error={error}
      editable={editable}>
      {/* {label && <InputLabel>
        {label}
      </InputLabel>} */}
      <ContainerButton 
        onPress={editable ? navigateTolist : () => {}}>
        <Container>
          <TextInput 
            onChangeText={text => onChangeText(text)}
            value={valueAsLabel}
            placeholder={placeholder}
            placeholderTextColor={error ? Colors.error : Colors.textDefault }
            editable={false}
            pointerEvents="none"
          />
          <Icon 
            name="keyboard-arrow-right" 
            size={iconSize} 
            color={Colors.textDefault}
          />   
        </Container>
      </ContainerButton>
      {error && <InputError error={error}>{errorMessage}</InputError>}
    </SelectionInputContainer>
  )
}

InputButton.defaultProps = {
  value: '',
  placeholder: '',
  label: '',
  errorMessage: '',
  editable: true,
  error: false,
  iconSize: 20,
  onChangeText: () => null,
  navigateTolist: () => null,
}

export default InputButton