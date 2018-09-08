'use strict'

import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { connect } from 'react-redux'
import GeoRegion from './geo-region'
import { getColor } from '../../util/getColor'
import { getCrimeData, clearData } from '../../store'

class GeoMap extends Component {
  state = {
    lat: 41.8781,
    lng: -87.6298,
    zoom: 12
  }

  handleViewchange = evt => {
    if(evt.target._zoom >= 18) {
      const bounds = evt.target.getBounds()
      const geomStr = 'MULTIPOLYGON(((' +
        bounds._northEast.lng + ' ' + bounds._northEast.lat + ',' +
        bounds._northEast.lng + ' ' + bounds._southWest.lat + ',' +
        bounds._southWest.lng + ' ' + bounds._southWest.lat + ',' +
        bounds._southWest.lng + ' ' + bounds._northEast.lat + ',' +
        bounds._northEast.lng + ' ' + bounds._northEast.lat + ')))'
      console.log(geomStr)
      this.props.getMarkers(geomStr)
    } else if (this.props.crimeData[0]) {
      this.props.clearMarkers()
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const { mapRegions, adj } = this.props
    let max, min
    if (mapRegions[0]) {
      max = mapRegions[0].count
      min = mapRegions[mapRegions.length - 1].count
    }

    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        onMoveend={this.handleViewchange}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;https://www.itsericguo.com&quot;>Eric Guo</a>"
          url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
          id='mapbox.streets'
          accessToken={process.env.MAPBOX_TOKEN}
        />
        {mapRegions.map(elem => {
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

const mapStateToProps = state => ({
  crimeData: state.crimeData
})

const mapDispatchToProps = dispatch => ({
  getMarkers: (geomStr) => dispatch(getCrimeData(geomStr)),
  clearMarkers: () => dispatch(clearData())
})

export default connect(mapStateToProps, mapDispatchToProps)(GeoMap)
