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
  errorMessage,
  marginRigth,
  marginLeft
}) => {
  const valueAsLabel = formatValue(value)
  return (
    <SelectionInputContainer
      marginLeft={marginLeft}
      marginRigth={marginRigth}
      error={error}
      editable={editable}>
      {label ? (
        <InputLabel>
          {label}
        </InputLabel>
      ) : null}
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
  label: null,
  errorMessage: '',
  editable: true,
  error: false,
  iconSize: 20,
  onChangeText: () => null,
  navigateTolist: () => null,
  marginRigth: null,
  marginLeft: null,
}

export default InputButton