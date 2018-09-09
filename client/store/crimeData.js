'use strict'

import axios from 'axios'

export const GET_DATA = 'GET_DATA'
const CLEAR_DATA = 'CLEAR_DATA'

const defaultData = []

const getData = crimeData => ({ type: GET_DATA, crimeData })
export const clearData = () => ({ type: CLEAR_DATA })

export const getCrimeData = geomStr => async dispatch => {
  try {
    const { data } = await axios.get('/api/crime-data', {
      params: {
        geomStr
      }
    })
    dispatch(getData(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(initialState = defaultData, action) {
  switch (action.type) {
    case GET_DATA:
      return [ ...action.crimeData ]
    case CLEAR_DATA:
      return []
    default:
      return initialState
  }
}
