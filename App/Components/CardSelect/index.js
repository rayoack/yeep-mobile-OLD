import React from 'react'
import {
  CardContainer,
  CardBoxContainer,
  SelectedCardBox,
  SelectedCardName,
  CardsTitle,
  CardsDescription,
  InputError,
  CardImage } from './styles'

const CardSelect = ({
  title,
  description,
  cardType,
  cards,
  selectedCards,
  onCardPress,
  editable,
  error,
  errorMessage,
}) => {
  return (
    <CardContainer 
      editable={editable}
      // onLayout={event => event.nativeEvent.layout.y}
    >
      {title ? (
        <CardsTitle 
          description={description} 
          error={error}
        >
          {title}
        </CardsTitle>
      ) : null
      }
      {
        description ? (
          <CardsDescription>
            {description}
          </CardsDescription>
        ) : null
      }
      <CardBoxContainer>
        {cards && cards.map((card, index) =>  (
          <SelectedCardBox
            key={index}
            cardType={cardType}
            full={cardType != 'min' && index == 2}
            selected={
              selectedCards != null ?
                selectedCards.value == card.value
                : false
            }
            onPress={editable ? () => onCardPress(card) : () => {}}
          >
            <CardImage source={selectedCards.value == card.value ?
              card.imageActive
              : card.imageInactive
            }/>

            <SelectedCardName
              selected={
                selectedCards != null ?
                  selectedCards.value == card.value
                  : false
              }>
              {card.title}
            </SelectedCardName>
          </SelectedCardBox>
        ))}
      </CardBoxContainer>
      {error && <InputError error={error}>{errorMessage}</InputError>}
    </CardContainer>
  );
}

CardSelect.defaultProps = {
  cards: [],
  cardType: '',
  selectedCards: [],
  editable: true,
  onItemPress: () => {},
  isSupplierForm: false
}

export default CardSelect