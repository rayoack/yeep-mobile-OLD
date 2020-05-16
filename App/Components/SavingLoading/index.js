import React from 'react';
import { View } from 'react-native';
import { Modal, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import { Images } from 'App/Theme'
import { translate } from '../../Locales'


import { ModalContainer, SavingLoadingLabel } from './styles';

const SavingLoading = ({
  loading
}) => {
  return (
    <Modal
      visible={loading}
      animationType={'fade'}
    >
      <ModalContainer>
        <LottieView
          source={Images.editing_animation}
          style={{ marginBottom: 120 }}
          autoPlay
          loop
        />
        <SavingLoadingLabel>{translate('savingLoadingText')}</SavingLoadingLabel>
      </ModalContainer>
    </Modal>
  );
}

SavingLoading.defaultProps = {
  loading: false
}

export default SavingLoading;