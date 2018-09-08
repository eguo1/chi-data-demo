'use strict'

import axios from 'axios'

export const GET_WARDS = 'GET_WARDS'

const defaultWards = []

const getWards = wards => ({ type: GET_WARDS, wards })

export const getWardData = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/wards/')
    dispatch(getWards(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(initialState = defaultWards, action) {
  switch (action.type) {
    case GET_WARDS:
      return [ ...action.wards ]
    default:
      return initialState
  }
}
