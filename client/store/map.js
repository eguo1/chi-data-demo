'use strict'

const SWITCH_DATASETS = 'SWITCH_DATASETS'

const defaultMapState = 'wards'

export const switchDatasets = () => ({ type: SWITCH_DATASETS })

export default function(initialState = defaultMapState, action) {
  switch (action.type) {
    case SWITCH_DATASETS:
      return initialState === 'wards' ? 'neighborhoods' : 'wards'
    default:
      return initialState
  }
}
