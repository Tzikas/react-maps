import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import randomMap from '../containers/random-cities/randomMap' 
import yourMap from '../containers/map/reducers' 


export default combineReducers({
  router: routerReducer,
  counter,
  randomMap,
  yourMap
})
