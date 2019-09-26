const initialState = {
  type: null,
  msg: null
}

export const notify = (message) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_MSG',
      payload: message
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_MSG'
      })
    }, 5000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_MSG':
    return action.payload
  case 'RESET_MSG':
    return {
      type: null,
      msg: null
    }
  default:
    return state
  }
}

export default notificationReducer