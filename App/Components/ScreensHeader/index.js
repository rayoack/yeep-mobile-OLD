import React from 'react'
import BackButton from '../BackButton'
import { Colors } from 'App/Theme'

import {
  HeaderContainer,
  BackButtonContainer,
  HeaderTitle
} from './styles'

const ScreensHeader = ({
  onPress,
  title
}) => {
  return (
    <HeaderContainer>
      <BackButtonContainer
        onPress={() => onPress()}>
        <BackButton color={Colors.white} size={20}/>
      </BackButtonContainer>

      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  )
}

ScreensHeader.defaultProps = {
  onPress: () => null,
  title: ''
}

export default ScreensHeader;