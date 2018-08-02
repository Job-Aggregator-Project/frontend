import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import jobs from './jobs'

export default combineReducers({
  routing: routerReducer,
  jobs
})