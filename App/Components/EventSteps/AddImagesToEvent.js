import React from 'react';
import { connect } from 'react-redux'

import { translate } from '../../Locales'
import { Images, Colors } from 'App/Theme'
import ButtonWithBackground from '../ButtonWithBackground'
import CarrouselFullScreen from '../CarrouselFullScreen'

import {
  ViewContainer,
  TopCotainer,
  EventStepLabel,
  EventStepText,
  EventImagesContainer,
  EventImageButtonContainer,
  EventImages,
  DeleteEventImageContainer,
  DeleteEventImageIcon
} from './styles'


const AddImagesToEvent = ({
  event,
  activeImageIndex,
  isCarrouselOpen,
  showCarrousel,
  onSnapToImage,
  deleteImage,
  showImagePicker,
}) => {
  return (
    <ViewContainer>
      <TopCotainer>
        <EventStepLabel>{translate('secondEditEventStepTitle')}</EventStepLabel>
        <EventStepText>{translate('secondEditEventStepText')}</EventStepText>
        <ButtonWithBackground
          onPress={() => showImagePicker('', 'multiple')}
          width={'150px'}
          text={translate('secondEditEventStepTitle')}/>
      </TopCotainer>

      {event.event_images ? (
        <>
          <EventImagesContainer horizontal>
            {event.event_images.map((image, index) => (
              <EventImageButtonContainer
                activeOpacity={0.7}
                key={index}
                onPress={() => onSnapToImage(index)}>
                <EventImages source={{ uri: image.url }} />
                
                <DeleteEventImageContainer
                  onPress={() => deleteImage(index)}
                  activeOpacity={0.8}
                >
                  <DeleteEventImageIcon source={Images.cancel}/>
                </DeleteEventImageContainer>
              </EventImageButtonContainer>
            ))}
          </EventImagesContainer>

          <CarrouselFullScreen
            data={event.event_images}
            onSnapToItem={onSnapToImage}
            showModal={showCarrousel}
            isModalOpen={isCarrouselOpen}
            activeImageIndex={activeImageIndex}
          />
        </>
      ) : null}
    </ViewContainer>
  );
}

AddImagesToEvent.defaultProps = {
  event: { event_images: [] },
  activeImageIndex: 0,
  isCarrouselOpen: false,
  onSnapToImage: () => null,
  showCarrousel: () => null,
  deleteImage: () => null,
  showImagePicker: () => null
}

const mapStateToProps = (state) => ({
  event: state.manageEventReducer.event
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImagesToEvent)
