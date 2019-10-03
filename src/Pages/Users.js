import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Users from '../components/Users'
import User from '../components/User'

const UserPage = ({match}) => {
  console.log('match is: ', match)
  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}`} render={() => <Users />} />
        <Route path={`${match.path}/:id`} render= {({match}) => <User userId={match.params.id}/>} />
      </Switch>
    </div>
  )
}

export default UserPage