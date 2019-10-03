import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line no-unused-vars
let token

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  return (await (axios.get(baseUrl))).data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const resp = await axios.post(baseUrl, newBlog, config)
  console.log(resp.data)
  return resp.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const body = { likes: blog.likes + 1 }
  const resp = await axios.put(`${baseUrl}/${blog.id}`, body, config)
  return resp.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const addComment = async (blog, newComment) => {
  const config = {
    headers: { Authorization: token }
  }
  const resp = await axios.post(`${baseUrl}/${blog.id}/comments`, newComment, config)
  return resp.data
}

export default { getAll, create, update, remove, setToken, addComment }