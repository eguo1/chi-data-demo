'use strict'

import React, { Component } from 'react'
import { GeoJSON, Popup } from 'react-leaflet'

export default class GeoRegion extends Component {
  handleMouseover = evt => {
    const layer = evt.target
    layer.setStyle({
      weight: 4, color: '#b0c5e8', dashArray: ''
    })
    layer.bringToFront()
  }

  handleMouseout = evt => {
    const layer = evt.target
    layer.setStyle({
      weight: 2, color: 'white', dashArray: '3'
    })
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
      >
        <Popup>
          {name} - {count}
        </Popup>
      </GeoJSON>
    )
  }
}
