import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import * as common from './common'
import * as test from './test'

const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  ...common,
  ...test,
})

export default rootReducer
