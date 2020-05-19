import React from 'react'
import { styles } from './styles'
import Toast from 'react-native-easy-toast'

const ViewComponent = ({
  setRef,
  position,
  positionValue,
  fadeInDuration,
  fadeOutDuration,
  opacity,
}) => {
  return (
    <Toast
      ref={(ref) => setRef(ref) }
      style={styles.toastContainer}
      position={position}
      positionValue={positionValue}
      fadeInDuration={fadeInDuration}
      fadeOutDuration={fadeOutDuration}
      opacity={opacity}
      textStyle={styles.toastText}
    />
  )
}

export default ViewComponent