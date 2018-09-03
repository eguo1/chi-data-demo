'use strict'

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { connect } from 'react-redux'
import { getWardData } from '../store'

class GeoMap extends Component {
  constructor() {
    super()
    this.state = {
      lat: 41.8781,
      lng: -87.6298,
      zoom: 12,
    }
  }

  componentDidMount () {
    return this.props.getWards()
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}

const mapStateToProps = state => ({
  wards: state.wards
})

const mapDispatchToProps = dispatch => ({
  getWards: () => dispatch(getWardData())
})

export default connect(mapStateToProps, mapDispatchToProps)(GeoMap)
