const initialState = {
  type: null,
  msg: null
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