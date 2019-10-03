import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'

const PrivateRoute = ({ isLoggedIn, ...props }) => (
  <Fragment>
    {isLoggedIn ? props.children : <Redirect to="/login" />}
  </Fragment>
)

export default PrivateRoute