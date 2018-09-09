'use strict'

import React from 'react'
import { GeoJSON, Popup } from 'react-leaflet'

const CrimeMarker = (props) => {
  const { location, type, date, arrest, block } = props
  return (
    <GeoJSON data={location}>
      <Popup>
        <div>
          {type} - {date} <br />
          {block} - {arrest}
        </div>
      </Popup>
    </GeoJSON>
  )
}

export default CrimeMarker
