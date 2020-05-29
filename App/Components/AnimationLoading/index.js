import React from 'react';
import { View } from 'react-native';
import { Modal, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import { Images } from 'App/Theme'
import { translate } from '../../Locales'


import { ModalContainer, LoadingLabel, AnimationContainer } from './styles';

const randomAnimation = [
  Images.yeep_loading,
  Images.yeep_loading_2,
  Images.yeep_loading_3,
]

const AnimationLoading = ({
  fullscreen,
  loading
}) => {
  let randomIndex = Math.floor(Math.random() * (3 - 0)) + 0
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
              source={randomAnimation[randomIndex]}
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