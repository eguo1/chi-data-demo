'use strict'

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polygon, GeoJSON } from 'react-leaflet'
import { getColor } from '../util/getColor'

export default class GeoMap extends Component {
  constructor() {
    super()
    this.state = {
      lat: 41.8781,
      lng: -87.6298,
      zoom: 12,
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;https://www.itsericguo.com&quot;>Eric Guo</a>"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {this.props.mapElements.map(elem => {
          return (
            <GeoJSON
              color='white'
              dashArray='3'
              weight='2'
              opacity='1'
              fillOpacity='0.65'
              fillColor={getColor(elem.count)}
              data={elem.geom}
              key={elem.name}
            />)
          })}
      </Map>
    )
  }
}
