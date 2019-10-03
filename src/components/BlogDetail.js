import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { likeBlog, deleteBlog } from './blogReducer'
import { notify } from './notificationReducer'

import CommentForm from './CommentForm'

const BlogDetail = ({ blog, currentUser, likeBlog, deleteBlog, notify, history }) => {

  const handleLike = (blog) => {
    likeBlog(blog)
    notify({ msg: `blog ${blog.title} liked!`, type: 'success' })
  }

  const handleDeleteBlog = (blog) => {
    if (window.confirm(`remove Blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog)
      notify({ msg: `${blog.title} deleted!`, type: 'success' })
      history.push('/')
    }
  }
  return (
    <div>
      {blog && (
        <div>
          <h1>{blog.title}</h1>
          <h3>{blog.author}</h3>
          <p><a href="www.example.com">{blog.url}</a></p>
          <div>
            {blog.likes} likes
            <button onClick={() => handleLike(blog)}>like </button>
          </div>
          <p>added by {blog.user.username}</p>
          <h3>Comments</h3>
          <CommentForm blog={blog} />
          {blog.comments && (
            <ul>
              {blog.comments.map(c => (
                <li key={c.id}>{c.content}</li>
              ))}
            </ul>
          )}
          {blog.user.username === currentUser.username && (
            <div>
              <button onClick={() => handleDeleteBlog(blog)}>Delete blog</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ blogs, currentUser }, { blogId }) => ({
  blog: blogs.find(b => b.id === blogId),
  currentUser
})

const mapDispatchToProps = ({
  likeBlog,
  deleteBlog,
  notify
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogDetail))