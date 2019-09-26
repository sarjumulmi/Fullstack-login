import blogServices from '../services/blogs'

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      payload: newBlog
    })
  }
}

export const resetBlogs = () => ({
  type: 'RESET_BLOGS'
})

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogServices.update(blog)
    dispatch({
      type: 'LIKE',
      payload: updatedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogServices.remove(blog)
    dispatch({
      type: 'REMOVE',
      payload: blog
    })
  }
}

const blogReducer = (state=[], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.payload
  case 'ADD_BLOG':
    return [ ...state, action.payload ]
  case 'RESET_BLOGS':
    return []
  case 'LIKE':
    return state.map(b => b.id === action.payload.id ? action.payload : b)
  case 'REMOVE':
    return state.filter(b => b.id !== action.payload.id)
  default:
    return state
  }
}

export default blogReducer