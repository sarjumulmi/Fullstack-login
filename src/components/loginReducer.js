import loginServices from '../services/login'
import blogServices from '../services/blogs'

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginServices.login({ username, password })
      dispatch({
        type: 'LOGIN',
        payload: user
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogServices.setToken(user.token)
    } catch (error) {
      throw error
    }
  }
}

export const setCurrentUser = () => ({
  type: 'LOGIN',
  payload: JSON.parse(window.localStorage.getItem('user'))
})

export const logout = () => ({
  type: 'LOGOUT'
})

const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.payload
  case 'LOGOUT':
    return {}
  default:
    return state
  }
}

export default userReducer