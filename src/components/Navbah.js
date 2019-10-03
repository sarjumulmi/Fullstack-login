import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from './loginReducer'
import { notify } from './notificationReducer'

const Navbar = styled.nav`
  display: flex;
  background-color: #DBDBDB;
  padding: .5rem;
  margin-bottom: 1rem;
`

const Navbah = ({ currentUser, logout, notify, history }) => {

  const handleLogout = () => {
    notify({ msg: `User ${currentUser.username} logged out!`, type: 'success' })
    window.localStorage.removeItem('user')
    logout()
    history.push('/login')
  }
  return (
    <Navbar >
      {currentUser.username && (
        <>
          <Link to="/">Blogs</Link>&nbsp;
          <Link to="/users">Users</Link>&nbsp;
          <span>{currentUser.username} Logged in</span>&nbsp;
          <button onClick={handleLogout} >Logout</button>&nbsp;
        </>
      )}
      {!currentUser.username && (
        <div>
          <button onClick={() => history.push('/login')} >Login</button>&nbsp;
        </div>
      )}
    </Navbar>
  )
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
})

const mapDispatchToProps = {
  logout, notify
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbah))