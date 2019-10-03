import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './components/blogReducer'
import notificationReducer from './components/notificationReducer'
import loginReducer from './components/loginReducer'
import userReducer from './components/userReducer'

const rootReducer = combineReducers({
  blogs: blogReducer,
  message: notificationReducer,
  currentUser: loginReducer,
  users: userReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store