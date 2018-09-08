'use strict'

import React from 'react'
import { Marker, Popup } from 'react-leaflet'

const CrimeMarker = (props) => {
  const { location, type, date, arrest, block } = props
  return (
    <Marker position={location}>
      <Popup>
        <div>
          {type} - {date} <br />
          {block} - {arrest}
        </div>
      </Popup>
    </Marker>
  )
}

export default CrimeMarker
