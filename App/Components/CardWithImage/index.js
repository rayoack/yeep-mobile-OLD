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

              {item.images.length > 1 ?
                <CarouselFooterContainer>
                  <SlideCountContainer>
                    <SlideCount>{`${item.imageIndex + 1}/${item.images.length}`}</SlideCount>
                  </SlideCountContainer>
                </CarouselFooterContainer>
              : null}
            </CarouselContainer>
          ) : (
            <CardImage source={Images.image_background} />
          )}

          <CardInfoContainer>
            <CardTitle>{item.title}</CardTitle>
            <CardSubTitle>{item.text}</CardSubTitle>

            <CardSubInfoContainer>

              {item.leftInfo ? (
                <LeftSubInfoContainer>
                  <LeftIconContainer>
                    <Icon source={item.leftIcon} />
                  </LeftIconContainer>

                  <CardSubInfoText>{item.leftInfo}</CardSubInfoText>
                </LeftSubInfoContainer>
              ) : null}

              {item.rigthInfo ? (
                <RigthSubInfoContainer>
                  <RigthIconContainer>
                    <Icon source={item.rigthIcon} />
                  </RigthIconContainer>

                  <CardSubInfoText>{item.rigthInfo}</CardSubInfoText>
                </RigthSubInfoContainer>
              ) : null}

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