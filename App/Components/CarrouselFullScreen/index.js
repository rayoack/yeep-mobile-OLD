import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Modal, Dimensions } from 'react-native'

import {
  ModalContainer,
  ModalIconContainer,
  CloseButton,
  CarouselContainer,
  CarouselFooterContainer,
  Slide,
  styles
} from './styles';

const CarrouselFullScreen = ({
  data,
  onSnapToItem,
  activeImageIndex,
  showModal,
  isModalOpen,
}) => {
  console.log('data', data)
  return (
    <Modal
      visible={isModalOpen}
      animationType={'fade'}
    >
      <ModalContainer>
        <ModalIconContainer>
          <CloseButton
            size={26}
            name={'close'}
            onPress={() => showModal()}
            color={'#FFF'}
          />
        </ModalIconContainer>
        <CarouselContainer>
          <Carousel
            data={data}
            renderItem={ ({item, index}) => {
              return <Slide onPress={showModal} key={index} source={{ uri: item.url }} />
            }}
            onSnapToItem={onSnapToItem}
            sliderWidth={Dimensions.get('window').width} 
            itemWidth={Dimensions.get('window').width}
            removeClippedSubviews={false}
            firstItem={activeImageIndex}
          />

          <CarouselFooterContainer>
            <Pagination
              activeDotIndex={activeImageIndex}
              dotsLength={data.length}
              dotStyle={styles.dotStyle}
              inactiveDotStyle={styles.inactiveDotStyle}
              dotContainerStyle={styles.dotContainerStyle}
              containerStyle={styles.paginationContainerStyle}
              inactiveDotOpacity={1}
              inactiveDotScale={0.9}
            />
          </CarouselFooterContainer>
        </CarouselContainer> 
      </ModalContainer>
    </Modal>
  );
}

CarrouselFullScreen.defaultProps = {
  data: [],
  isModalOpen: false,
  onSnapToItem: () => {},
  showModal: () => {},
}

export default CarrouselFullScreen;