'use strict'

import { GET_DATA, GET_NEIGHBORHOODS, GET_WARDS } from './index'

const REQUEST_FETCH = 'REQUEST_FETCH'

export const requestFetch = () => ({ type: REQUEST_FETCH })

export default function(initialState = false, action) {
  switch(action.type) {
    case REQUEST_FETCH:
      return true
    case GET_DATA:
    case GET_NEIGHBORHOODS:
    case GET_WARDS:
      return false
    default:
      return initialState
  }
}
