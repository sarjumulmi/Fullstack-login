import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './components/blogReducer'
import notificationReducer from './components/notificationReducer'

const rootReducer = combineReducers({
  blogs: blogReducer,
  message: notificationReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store