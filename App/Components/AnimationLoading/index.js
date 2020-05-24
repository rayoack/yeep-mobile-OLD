import React from 'react';
import { View } from 'react-native';
import { Modal, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import { Images } from 'App/Theme'
import { translate } from '../../Locales'


import { ModalContainer, LoadingLabel, AnimationContainer } from './styles';

const AnimationLoading = ({
  fullscreen,
  loading
}) => {
  return (
    <>
      {fullscreen ? (
        <Modal
          visible={loading}
          animationType={'fade'}
        >
          <ModalContainer
            fullscreen={fullscreen}
          >
            <LottieView
              source={Images.yeep_loading}
              style={{ marginBottom: 120 }}
              autoPlay
              loop
            />
            <LoadingLabel fullscreen={fullscreen}>{translate('loadingText')}</LoadingLabel>
          </ModalContainer>
        </Modal>
      ) : (
        <>
          <ModalContainer>
            <LottieView
              source={Images.yeep_loading}
              style={{ marginBottom: 100 }}
              autoPlay
              loop
            />

            <LoadingLabel>{translate('loadingText')}</LoadingLabel>
          </ModalContainer>
        </>
      )}
    </>
  );
}

AnimationLoading.defaultProps = {
  loading: false,
  fullscreen: false,
}

export default AnimationLoading;