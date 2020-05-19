import React, { Component } from 'react'
import ViewComponent from './ViewComponent'

class CustomToast extends Component {

  _toastRef = null

  componentDidUpdate = () => {
    if (this.props.show) {
      this.showToast()
    }
  }

  showToast = () => {
    if (this._toastRef) {
      this._toastRef.show(this.props.text, this.props.duration, this.props.callback)
    }
  }

  setRef = (ref) => {
    this._toastRef = ref
  }

  render() {
    return ( 
      <ViewComponent
        setRef={this.setRef} 
        position={this.props.position}
        positionValue={this.props.positionValue}
        fadeInDuration={this.props.fadeInDuration}
        fadeOutDuration={this.props.fadeOutDuration}
        opacity={this.props.opacity}
      />
    )
  }
}

CustomToast.defaultProps = {
  text: '',
  position: 'top',
  positionValue: 200,
  fadeInDuration: 750,
  fadeOutDuration: 1000,
  opacity: 0.8
}

export default CustomToast