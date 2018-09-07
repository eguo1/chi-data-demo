'use strict'

import React, { Component } from 'react'
import { GeoJSON, Popup } from 'react-leaflet'

const defaultStyle = {
  weight: 2, color: 'white', dashArray: '3'
}

const focusStyle = {
  weight: 4, color: '#95a4c1', dashArray: ''
}

export default class GeoRegion extends Component {
  state = {
    popupOpen: false
  }

  handleMouseover = evt => {
    const layer = evt.target
    layer.setStyle(focusStyle)
    layer.bringToFront()
  }

  handleMouseout = evt => {
    const layer = evt.target
    if (!this.state.popupOpen) {
      layer.setStyle(defaultStyle)
      layer.bringToBack()
    }
  }

  handlePopupopen = evt => {
    const layer = evt.target
    layer.setStyle(focusStyle)
    layer.bringToFront()
    this.setState({ popupOpen: true })
  }

  handlePopupclose = evt => {
    const layer = evt.target
    layer.setStyle(defaultStyle)
    layer.bringToBack()
    this.setState({ popupOpen: false })
  }

  render() {
    const { fillColor, geom, name, count } = this.props
    return (
      <GeoJSON
        color='white'
        dashArray='3'
        weight='2'
        opacity='1'
        fillOpacity='0.65'
        fillColor={fillColor}
        data={geom}
        onMouseover={this.handleMouseover}
        onMouseout={this.handleMouseout}
        onPopupopen={this.handlePopupopen}
        onPopupclose={this.handlePopupclose}
      >
        <Popup>
          {name} - {count}
        </Popup>
      </GeoJSON>
    )
  }
}
