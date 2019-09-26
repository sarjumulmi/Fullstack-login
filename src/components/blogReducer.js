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

const blogReducer = (state=[], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    console.log('blogs are: ', action)
    return action.payload
  case 'ADD_BLOG':
    return [ ...state, action.payload ]
  case 'RESET_BLOGS':
    return []
  default:
    return state
  }
}

export default blogReducer