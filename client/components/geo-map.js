'use strict'

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polygon, GeoJSON } from 'react-leaflet'
import L from 'leaflet'
import { connect } from 'react-redux'
import { getWardData } from '../store'
import { getColor } from '../util/getColor'

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
        {/* <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {this.props.wards.map(ward => {
          return (
            <GeoJSON
              color='white'
              dashArray='3'
              weight='2'
              opacity='1'
              fillOpacity='0.65'
              fillColor={getColor(ward.count)}
              data={ward.geom}
              key={ward.name}
            />)
          })}
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
