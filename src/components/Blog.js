import React, { useState } from 'react'

const Blog = ({ blog, handleDeleteBlog, handleLike, isCreator, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    blog === null ? null : (
      <div className="blog">
        <div className="blog-card--title" onClick={toggleVisibility}>
          {blog.title} {blog.author}
        </div>
        {visible && (
          <div className="blog-card">
            <a href="#">{blog.url}</a>
            <div>
              {blog.likes} likes
              <button onClick={() => handleLike(blog)}>like</button>
            </div>
            <div>Added by {user.username}</div>
            {isCreator && (
              <div>
                <button onClick={() => handleDeleteBlog(blog)}>Delete blog</button>
              </div>
            )}
          </div>
        )
        }
      </div>
    )
  )
}

export default Blog