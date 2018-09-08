'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getWardData,
  getNeighborhoodData,
  switchDatasets
} from '../store'
import GeoMap from './map/geo-map'

class MapContainer extends Component {
  async componentDidMount() {
    await this.props.getWards()
    return this.props.getNeighborhoods()
  }

  handleSwitch = () => {
    this.props.toggleDisplay()
  }

  render() {
    const { map, wards, neighborhoods } = this.props
    const isWards = (map === 'wards')
    return (
      <div>
        <button
          onClick={this.handleSwitch}
        >
          Switch
        </button>
        <GeoMap
          mapRegions={isWards ? wards : neighborhoods}
          adj={isWards ? 1 : 0.75}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  map: state.map,
  wards: state.wards,
  neighborhoods: state.neighborhoods
})

const mapDispatchToProps = dispatch => ({
  getWards: () => dispatch(getWardData()),
  getNeighborhoods: () => dispatch(getNeighborhoodData()),
  toggleDisplay: () => dispatch(switchDatasets())
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
