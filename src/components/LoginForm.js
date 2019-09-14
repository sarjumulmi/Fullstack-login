import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => (
  <form onSubmit={handleLogin}>
    <h2>Login to the application</h2>
    <div>Username: <input type="text" name="username"  value={ username } onChange={(e) => setUsername(e.target.value)}/></div>
    <div>Password: <input type="text" name="password"  value={ password } onChange={(e) => setPassword(e.target.value)}/></div>
    <button>Login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm