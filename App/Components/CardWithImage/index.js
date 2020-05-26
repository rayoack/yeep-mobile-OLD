import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Images } from 'App/Theme'

import {
  CardContainer,
  CardImage,
  CardInfoContainer,
  CardTitle,
  CardSubTitle,
  CardSubInfoContainer,
  RigthSubInfoContainer,
  RigthIconContainer,
  LeftIconContainer,
  LeftSubInfoContainer,
  CardSubInfoText,
  Icon,
  CarouselContainer,
  CarouselFooterContainer,
  SlideCountContainer,
  SlideCount,
  styles,
} from './styles';

const CardWithImage = ({
  item,
  onSnapToItem,
  onCardPress
}) => {
  return (
    <>
      {item ? (
        <CardContainer
          activeOpacity={0.9}
          onPress={() => onCardPress(item.id)}>
          {item.images ? (
            <CarouselContainer>

              <Carousel
                data={item.images}
                renderItem={ ({item, index}) => {
                  return (
                    <CardImage 
                      key={index}
                      source={{ uri: item.url }}
                    />
                  )
                }}
                onSnapToItem={index => onSnapToItem(item, index)}
                sliderWidth={Dimensions.get('window').width - 40} 
                itemWidth={Dimensions.get('window').width - 40}
                removeClippedSubviews={false}
                firstItem={item.imageIndex}
              />

              <CarouselFooterContainer>
                <SlideCountContainer>
                  <SlideCount>{`${item.imageIndex + 1}/${item.images.length}`}</SlideCount>
                </SlideCountContainer>
              </CarouselFooterContainer>
            </CarouselContainer>
          ) : (
            <CardImage source={Images.image_background} />
          )}

          <CardInfoContainer>
            <CardTitle>{item.title}</CardTitle>
            <CardSubTitle>{item.text}</CardSubTitle>

            <CardSubInfoContainer>

              <LeftSubInfoContainer>
                <LeftIconContainer>
                  <Icon source={item.leftIcon} />
                </LeftIconContainer>

                <CardSubInfoText>{item.leftInfo}</CardSubInfoText>
              </LeftSubInfoContainer>

              <RigthSubInfoContainer>
                <RigthIconContainer>
                  <Icon source={item.rigthIcon} />
                </RigthIconContainer>

                <CardSubInfoText>{item.rigthInfo}</CardSubInfoText>
              </RigthSubInfoContainer>

            </CardSubInfoContainer>
          </CardInfoContainer>
        </CardContainer>
      ) : null}
    </>
  )
}

CardWithImage.defaultProps = {
  item: {},
  activeImageIndex: 0,
  onSnapToItem: () => null,
  onCardPress: () => null,
}

export default CardWithImage;