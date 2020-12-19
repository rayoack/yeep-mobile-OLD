import React from 'react';
import { View } from 'react-native';
import { Colors } from 'App/Theme';

import {
    Container,
    IconContainer,
    ArrowBack,
    EditIcon,
    onPressEdit
} from './styles';

const HeaderWithBackButton = ({
    navigation,
    edit
}) => {
  return (
    <Container>
        <IconContainer onPress={() => navigation.goBack()}>
            <ArrowBack
                name={'arrowleft'}
                size={25}
                color={Colors.primary}
            />
        </IconContainer>

        {edit ? (
            <IconContainer onPress={() => onPressEdit()}>
                <EditIcon
                    name={'edit-3'}
                    size={25}
                    color={Colors.primary}
                />
            </IconContainer>
        ) : null}
    </Container>
  );
}

HeaderWithBackButton.defaultProps = {
    navigation: {
        goBack: () => null
    },
    edit: false,
    onPressEdit: () => null
}

export default HeaderWithBackButton;