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
  SlideCountContainer,
  SlideCount,
  styles
} from './styles';

const CarrouselFullScreen = ({
  data,
  onSnapToItem,
  activeImageIndex,
  showModal,
  isModalOpen,
}) => {
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
            <SlideCountContainer>
              <SlideCount>{`${activeImageIndex + 1}/${data.length}`}</SlideCount>
            </SlideCountContainer>
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