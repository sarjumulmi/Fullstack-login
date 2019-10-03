import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import { useField } from '../hooks'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  margin: 0 auto;
  > div {
    display: flex;
    min-width: 60%
    flex-direction: column;
    align-content: space-between;
    margin-bottom: 1rem;
  }
  > h2 {
    border-bottom: 1px solid #404D52;
  }
`

const Button = styled.button`
color: #fff !important;
text-transform: uppercase;
text-decoration: none;
font-size: 1rem;
font-weight: 200;
background: #3E88F1;
padding: 8px 2rem;
border-radius: 5px;
display: inline-block;
border: none;
transition: all 0.4s ease 0s;
  &:hover {
    background: #434343;
    letter-spacing: 1px;
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
  }
}
`

const LoginForm = ({ handleLogin }) => {
  // eslint-disable-next-line no-unused-vars
  let [ username ]  = useField('text')
  let [ password ] = useField('password')

  return (
    <Form onSubmit={e => {handleLogin(e, username, password)}}>
      <h2>Login to the application</h2>
      <div>
        <label>Username: </label><input {...username}/>
        <label>Password: </label> <input {...password}/>
      </div>
      <Button>Login</Button>
    </Form>
  )
}


LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm