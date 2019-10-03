import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom'

import blogServices from './services/blogs'

import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogDetail from './components/BlogDetail'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserPage from './Pages/Users'
import Test from './components/Test'
import PrivateRoute from './components/PrivateRoute'
import Navbah from './components/Navbah'

import { initBlogs, createBlog, resetBlogs, likeBlog, deleteBlog } from './components/blogReducer'
import { notify } from './components/notificationReducer'
import { loginUser, logout, setCurrentUser } from './components/loginReducer'
import { getAllUsers } from './components/userReducer'

import './App.css'

const BlogList = ({ blogs }) => (
  <div>
    {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
      <div key={ blog.id }>
        <Blog blog={ blog } />
      </div>
    ))}
    <Togglable buttonLabel='Create new blog'>
      <BlogForm />
    </Togglable>
    <Link to="/users" >Go to Users</Link>
  </div>
)

const App = (props) => {
  const { blogs, currentUser, initBlogs, resetBlogs, message, notify, loginUser, logout, history, getAllUsers, setCurrentUser } = props

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      if (Object.keys(currentUser).length === 0){
        setCurrentUser()
      }
      initBlogs()
      getAllUsers()
      blogServices.setToken(JSON.parse(window.localStorage.getItem('user')).token)
    }
  }, [])

  const handleLogout = () => {
    console.log('user loogin out is ', currentUser)
    notify({ msg: `User ${currentUser.username} logged out!`, type: 'success' })
    window.localStorage.removeItem('user')
    logout()
    history.push('/login')
    resetBlogs()
  }

  const handleLogin = async (e, username, password) => {
    e.preventDefault()
    try {
      await loginUser(username.value, password.value, history)
      history.push('/')
      console.log('history is: ', history)
      initBlogs()
      notify({ msg: `User ${username.value} logged in!`, type: 'success' }, 5000)
    } catch (error) {
      console.log(error)
      notify({ msg: (error.response && error.response.data && error.response.data.error) || 'incorrect credentials', type: 'error' })
    }
  }

  const isLoggedIn = window.localStorage.getItem('user') !== null
  console.log('user logged in? : ', isLoggedIn)
  return (
    <div>
      <Navbah />
      {message && <Notification message={message} />}
      <Route path="/login" render={() => isLoggedIn ? <Redirect to="/" /> : <LoginForm handleLogin={handleLogin} />}/>
      <PrivateRoute isLoggedIn={isLoggedIn} >
        <h2>Blogs</h2>
        <div>{currentUser.username} logged in</div>
        <span><button onClick={handleLogout} >Logout</button></span>
        <Switch>
          <Route exact path="/" render={() => <BlogList blogs={blogs} />} />
          <Route  path="/users" component={UserPage} />
          <Route path="/blogs/:id" render={({ match }) => <BlogDetail blogId={match.params.id} />} />
          <Route render={() => <Test />} />
        </Switch>
      </PrivateRoute>
    </div>
  )
}

const mapStateToProps = ({ blogs, message, currentUser }) => ({
  blogs,
  message,
  currentUser
})

const mapDispatchToProps = {
  initBlogs, createBlog, resetBlogs, likeBlog, deleteBlog, notify, loginUser, logout, getAllUsers, setCurrentUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
