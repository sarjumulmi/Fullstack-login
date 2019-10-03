import React from 'react'
import { connect } from 'react-redux'

const User = ({ user }) => {
  // const blogs = user.blogs
  return (
    <div>
      {!user ? 'User Does Not Exist' : (
        <div>
          <h1>{user.username}</h1>
          <h3>added blogs</h3>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      )
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users.find(u => u.id === ownProps.userId)
})
export default connect(mapStateToProps)(User)