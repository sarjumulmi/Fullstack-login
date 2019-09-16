import React, { useState, useEffect } from 'react'

import loginServices from './services/login'
import blogServices from './services/blogs'

import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

import './App.css'

const BlogList = ({ blogs }) => (
  blogs.map(blog => (
    <div key={ blog.id }>
      <Blog blog={ blog } />
    </div>
  ))
)

const BlogForm = ({ handleNewBlog, title, author, url, setTitle, setAuthor, setUrl }) => (
  <form onSubmit={handleNewBlog}>
    <h2>Add new Blog</h2>
    <div>Title: <input name="title" value={title} onChange={e => setTitle(e.target.value)} /></div>
    <div>Author: <input name="author" value={author} onChange={e => setAuthor(e.target.value)} /></div>
    <div>Url: <input name="url" value={url} onChange={e => setUrl(e.target.value)} /></div>
    <button>Add blog </button>
  </form>
)

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const getBlogs = async () => {
      const resp = await blogServices.getAll()
      setBlogs(resp.data.sort((a, b) => b.likes - a.likes))
    }
    if (window.localStorage.getItem('user')) {
      const user = JSON.parse(window.localStorage.getItem('user'))
      setUser(user)
      blogServices.setToken(user.token)
      getBlogs()
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    setBlogs(null)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginServices.login({ username, password })
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogServices.setToken(user.token)
      const resp = await blogServices.getAll()
      setBlogs(resp.data)
      setUsername('')
      setPassword('')
      setMessage({ msg: `User ${username} logged in!`, type: 'success' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
      setMessage({ msg: error.response.data.error || 'incorrect credentials', type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleNewBlog = async (e) => {
    e.preventDefault()
    try {
      const newBlog = await blogServices.create({ title, author, url })
      setBlogs([...blogs, newBlog])
      setAuthor('')
      setTitle('')
      setUrl('')
      setMessage({ msg: `new blog ${newBlog.title} created!`, type: 'success' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error.response)
      setAuthor('')
      setTitle('')
      setUrl('')
      setMessage({ msg: error.response.data.error || 'some went wrong', type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {message && <Notification message={message} />}
      {user === null && <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />}
      {user !== null && (
        <div >
          <h2>Blogs</h2>
          <div>{user.username} logged in</div>
          <span><button onClick={handleLogout} >Logout</button></span>
          {blogs && <BlogList blogs={blogs} />}
          <Togglable buttonLabel='Create new blog'>
            <BlogForm handleNewBlog={handleNewBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App
