import userServices from '../services/users'

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userServices.getAll()
    dispatch({
      type: 'GET_ALL',
      payload: users
    })
  }
}

export const resetUsers = () => ({
  type: 'RESET'
})

const userReducer = (state=[], action) => {
  switch (action.type) {
  case 'GET_ALL':
    return action.payload
  case 'RESET':
    return []
  default:
    return state
  }
}

export default userReducer