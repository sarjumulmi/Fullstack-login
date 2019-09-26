import React from 'react'
import PropTypes from 'prop-types'

import { useField } from '../hooks'

const LoginForm = ({ handleLogin }) => {
  // eslint-disable-next-line no-unused-vars
  let [ username ]  = useField('text')
  let [ password ] = useField('password')

  return (
    <form onSubmit={e => {handleLogin(e, username, password)}}>
      <h2>Login to the application</h2>
      <div>Username: <input {...username}/></div>
      <div>Password: <input {...password}/></div>
      <button>Login</button>
    </form>
  )
}


LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm