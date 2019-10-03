import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = ({ users }) => (
  <div>
    Users
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th># of blogs</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>
      <Link to="/" >Home</Link>
    </div>
  </div>
)

const mapStateToProps = ({ users }) => ({
  users
})

export default connect(mapStateToProps)(Users)