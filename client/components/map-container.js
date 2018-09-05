'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getWardData,
  getNeighborhoodData,
  switchDatasets
} from '../store'
import GeoMap from './geo-map'

class MapContainer extends Component {
  componentDidMount() {
    return this.props.getWards() && this.props.getNeighborhoods()
  }

  handleSwitch = () => {
    this.props.toggleDisplay()
  }

  render() {
    const { map, wards, neighborhoods } = this.props
    return (
      <div>
        <button
          onClick={this.handleSwitch}
        >
          Switch
        </button>
        <GeoMap mapElements={map === 'wards' ? wards : neighborhoods}/>
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
