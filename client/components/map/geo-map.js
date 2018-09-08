'use strict'

import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import GeoRegion from './geo-region'
import { getColor } from '../../util/getColor'

export default class GeoMap extends Component {
  constructor() {
    super()
    this.state = {
      lat: 41.8781,
      lng: -87.6298,
      zoom: 12,
    }
  }

  handleViewchange = evt => {
    if(evt.target._zoom >= 16) {
      console.log(evt.target.getBounds())
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const { mapElements, adj } = this.props
    let max, min
    if (mapElements[0]) {
      max = mapElements[0].count
      min = mapElements[mapElements.length - 1].count
    }

    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        onZoomend={this.handleViewchange}
        onMoveend={this.handleViewchange}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;https://www.itsericguo.com&quot;>Eric Guo</a>"
          url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
          id='mapbox.streets'
          accessToken={process.env.MAPBOX_TOKEN}
        />
        {mapElements.map(elem => {
          return (
            <GeoRegion
              key={elem.name}
              fillColor={getColor(max, min, adj, elem.count)}
              geom={elem.geom}
              name={elem.name}
              count={elem.count}
            />
          )})
        }
      </Map>
    )
  }
}
