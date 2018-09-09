import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import wards from './ward'
import neighborhoods from './neighborhood'
import map from './map'
import crimeData from './crimeData'
import isFetching from './isFetching'

const reducer = combineReducers({
  user, wards, neighborhoods, map, crimeData, isFetching
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './ward'
export * from './neighborhood'
export * from './map'
export * from './crimeData'
export * from './isFetching'
