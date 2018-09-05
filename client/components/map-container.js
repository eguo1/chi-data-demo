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
    return this.props.getWards()
  }

  handleSwitch = () => {
    this.props.toggleDisplay()
  }

  render() {
    return (
      <div>
        <button
          onClick={this.handleSwitch}
        >
          Switch
        </button>
        <GeoMap mapElements={this.props.wards}/>
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