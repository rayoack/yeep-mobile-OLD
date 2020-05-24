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
  styles,
} from './styles';

const CardWithImage = ({
  item,
  onSnapToItem
}) => {
  return (
    <>
      {item ? (
        <CardContainer>
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
                sliderWidth={Dimensions.get('window').width - 20} 
                itemWidth={Dimensions.get('window').width - 20}
                removeClippedSubviews={false}
                firstItem={item.imageIndex}
              />

              <CarouselFooterContainer>
                <Pagination
                  activeDotIndex={item.imageIndex}
                  dotsLength={item.images.length}
                  dotStyle={styles.dotStyle}
                  inactiveDotStyle={styles.inactiveDotStyle}
                  dotContainerStyle={styles.dotContainerStyle}
                  containerStyle={styles.paginationContainerStyle}
                  inactiveDotOpacity={1}
                  inactiveDotScale={0.9}
                />
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
  onSnapToItem: () => null
}

export default CardWithImage;