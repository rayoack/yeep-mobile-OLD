import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from 'App/Theme'

import {
    Container,
    Title,
    Description,
    SubDescription
} from './styles';

const MiniCard = ({
    title,
    description,
    subDescription,
    onPress
}) => {
  return (
    <Container onPress={onPress}>
        <View style={{ justifyContent: 'center' }}>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <SubDescription>{subDescription}</SubDescription>
        </View>
        <View style={{ alignItems: 'flex-end', justifyContent: 'center', flex: 1 }}>
          <Icon 
            name="keyboard-arrow-right" 
            size={30} 
            color={Colors.textDefault}
          />
        </View>
    </Container>
  );
}

MiniCard.defaultProps = {
    title: '',
    description: '',
    subDescription: '',
    onPress: () => null
}

export default MiniCard;