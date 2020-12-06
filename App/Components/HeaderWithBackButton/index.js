import React from 'react';
import { View } from 'react-native';
import { Colors } from 'App/Theme';

import {
    Container,
    ArrowBackContainer,
    ArrowBack
} from './styles';

const HeaderWithBackButton = ({
    navigation
}) => {
  return (
    <Container>
        <ArrowBackContainer onPress={() => navigation.goBack()}>
            <ArrowBack
                name={'arrowleft'}
                size={25}
                color={Colors.primary}
            />
        </ArrowBackContainer>

    </Container>
  );
}

HeaderWithBackButton.defaultProps = {
    navigation: {
        goBack: () => null
    }
}

export default HeaderWithBackButton;