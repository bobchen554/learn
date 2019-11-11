import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'

import home from './reducer/home'

const rootReducer = combineReducers({
    home
})
  
const store = createStore(rootReducer, applyMiddleware(logger))

  
export default store