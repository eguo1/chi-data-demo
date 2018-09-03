'use strict'

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { connect } from 'react-redux'
import { getWardData } from '../store'

const tempWard = {
  centroid:{
    type: "Point",
    coordinates: [
      -87.697928, 41.749525
    ]
  },
  count: 6332,
  createdAt: "2018-09-03T17:33:08.004Z",
  geom: {
    type: "MultiPolygon",
    coordinates: [
      [
        [-87.693122, 41.768231],
        [-87.687015, 41.768275],
        [-87.686961, 41.766458],
        [-87.685737, 41.766478],
        [-87.685688, 41.764658],
        [-87.678726, 41.764754],
        [-87.67854, 41.757654],
        [-87.669692, 41.757784],
        [-87.669495, 41.750277],
        [-87.668291, 41.750293],
        [-87.668202, 41.746652],
        [-87.664558, 41.746698],
        [-87.664465, 41.743056],
        [-87.663252, 41.743077],
        [-87.663065, 41.73579],
        [-87.741067, 41.734524],
        [-87.740929, 41.736621],
        [-87.741104, 41.741897],
        [-87.721679, 41.742179],
        [-87.722176, 41.757152],
        [-87.715983, 41.757368],
        [-87.712342, 41.757303],
        [-87.712771, 41.771522],
        [-87.693206, 41.771824],
        [-87.693122, 41.768231]
      ]
    ]
  },
  id: 18,
  name: "18",
  updatedAt:"2018-09-03T21:04:16.900Z"
}

const multiPolygon = [
  [
    [-87.693122, 41.768231],
    [-87.687015, 41.768275],
    [-87.686961, 41.766458],
    [-87.685737, 41.766478],
    [-87.685688, 41.764658],
    [-87.678726, 41.764754],
    [-87.67854, 41.757654],
    [-87.669692, 41.757784],
    [-87.669495, 41.750277],
    [-87.668291, 41.750293],
    [-87.668202, 41.746652],
    [-87.664558, 41.746698],
    [-87.664465, 41.743056],
    [-87.663252, 41.743077],
    [-87.663065, 41.73579],
    [-87.741067, 41.734524],
    [-87.740929, 41.736621],
    [-87.741104, 41.741897],
    [-87.721679, 41.742179],
    [-87.722176, 41.757152],
    [-87.715983, 41.757368],
    [-87.712342, 41.757303],
    [-87.712771, 41.771522],
    [-87.693206, 41.771824],
    [-87.693122, 41.768231]
  ]
]

class GeoMap extends Component {
  constructor() {
    super()
    this.state = {
      lat: 41.8781,
      lng: -87.6298,
      zoom: 12,
      tempCoords: multiPolygon
    }
  }

  componentDidMount () {
    return this.props.getWards()
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    console.log(this.props.wards[0])
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
        {/* {this.props.wards.map(ward => {
          return <Polygon color='purple' positions={ward.geom.coordinates} key={ward.name} />
          })} */}
          <Polygon color='purple' positions={this.state.tempCoords} />
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
