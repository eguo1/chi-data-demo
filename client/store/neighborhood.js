'use strict'

import axios from 'axios'

export const GET_NEIGHBORHOODS = 'GET_NEIGHBORHOODS'

const defaultNeighborhoods = []

const getNeighborhoods = neighborhoods => ({ type: GET_NEIGHBORHOODS, neighborhoods })

export const getNeighborhoodData = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/neighborhoods/')
    dispatch(getNeighborhoods(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(initialState = defaultNeighborhoods, action) {
  switch (action.type) {
    case GET_NEIGHBORHOODS:
      return [ ...action.neighborhoods ]
    default:
      return initialState
  }
}
