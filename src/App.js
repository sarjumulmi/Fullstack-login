import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import blogServices from './services/blogs'

import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

import { initBlogs, createBlog, resetBlogs, likeBlog, deleteBlog } from './components/blogReducer'
import { notify } from './components/notificationReducer'
import { loginUser, logout } from './components/userReducer'

import './App.css'


const BlogForm = ({ handleNewBlog, title, author, url, setTitle, setAuthor, setUrl }) => (
  <form onSubmit={handleNewBlog}>
    <h2>Add new Blog</h2>
    <div>Title: <input name="title" value={title} onChange={e => setTitle(e.target.value)} /></div>
    <div>Author: <input name="author" value={author} onChange={e => setAuthor(e.target.value)} /></div>
    <div>Url: <input name="url" value={url} onChange={e => setUrl(e.target.value)} /></div>
    <button>Add blog </button>
  </form>
)

const App = (props) => {
  const { blogs, initBlogs, createBlog, resetBlogs, likeBlog, deleteBlog, message, notify, user, loginUser, logout } = props
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    console.log('user is: ', user)
    if (window.localStorage.getItem('user')) {
      initBlogs()
      blogServices.setToken(JSON.parse(window.localStorage.getItem('user')))
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogServices.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    notify({ msg: `User ${user.username} logged out!`, type: 'success' })
    window.localStorage.removeItem('user')
    logout()
    resetBlogs()
  }

  const handleLogin = async (e, username, password) => {
    e.preventDefault()
    try {
      loginUser(username.value, password.value)
      notify({ msg: `User ${username.value} logged in!`, type: 'success' })
      initBlogs()
    } catch (error) {
      console.log(error)
      notify({ msg: (error.response && error.response.data && error.response.data.error) || 'incorrect credentials', type: 'error' })
    }
  }

  const handleNewBlog = async (e) => {
    e.preventDefault()
    try {
      createBlog({ title, author, url })
      setAuthor('')
      setTitle('')
      setUrl('')
      notify({ msg: `new blog ${title} created!`, type: 'success' })
    } catch (error) {
      console.log(error.response)
      setAuthor('')
      setTitle('')
      setUrl('')
      notify({ msg: error.response.data.error || 'some went wrong', type: 'error' })
    }
  }

  const handleLike = async (blog) => {
    likeBlog(blog)
    notify({ msg: `blog ${blog.title} liked!`, type: 'success' })
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`remove Blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog)
    }
    notify({ msg: `${blog.title} deleted!`, type: 'success' })
  }

  return (
    <div>
      {message && <Notification message={message} />}
      {Object.keys(user).length === 0 && <LoginForm handleLogin={handleLogin} />}
      {Object.keys(user).length !== 0 && (
        <div >
          <h2>Blogs</h2>
          <div>{user.username} logged in</div>
          <span><button onClick={handleLogout} >Logout</button></span>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
            <div key={ blog.id }>
              <Blog blog={ blog } handleDeleteBlog={handleDeleteBlog} handleLike={handleLike} isCreator={blog.user.username === user.username} user={user}/>
            </div>
          ))}
          <Togglable buttonLabel='Create new blog'>
            <BlogForm handleNewBlog={handleNewBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
          </Togglable>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ blogs, message, user }) => ({
  blogs,
  message,
  user
})

const mapDispatchToProps = {
  initBlogs, createBlog, resetBlogs, likeBlog, deleteBlog, notify, loginUser, logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
