import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import ticker from './ticker'
import trades from './trades'
import books from './books'
import settings from './settings'

export default combineReducers({
  routing: routerReducer,
  ticker,
  trades,
  books,
  settings
})
