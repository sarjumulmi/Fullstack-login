import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logout } from './loginReducer'
import { notify } from './notificationReducer'

const Navbah = ({ currentUser, logout, notify, history }) => {
  const style = {
    backgroundColor: '#DBDBDB',
    padding: '.5rem'
  }

  const handleLogout = () => {
    notify({ msg: `User ${currentUser.username} logged out!`, type: 'success' })
    window.localStorage.removeItem('user')
    logout()
    history.push('/login')
  }
  return (
    <div style={style}>
      {currentUser.username && (
        <div>
          <Link to="/">blogs</Link>&nbsp;
          <Link to="/users">users</Link>&nbsp;
          <span>{currentUser.username} logged in</span>&nbsp;
          <button onClick={handleLogout} >logout</button>&nbsp;
        </div>
      )}
      {!currentUser.username && (
        <div>
          <button onClick={() => history.push('/login')} >login</button>&nbsp;
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
})

const mapDispatchToProps = {
  logout, notify
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbah))