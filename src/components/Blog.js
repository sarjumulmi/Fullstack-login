import React, { useState, useEffect } from 'react'
import blogServices from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState(null)
  const [blogToDisplay, setBlogToDisplay] = useState(blog)

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user')))
  }, [])

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (blog) => {
    await blogServices.update(blog)
    setBlogToDisplay({ ...blog, likes: blog.likes + 1 })
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`remove Blog ${blogToDisplay.title} by ${blogToDisplay.author}?`)) {
      await blogServices.remove(blog)
      setBlogToDisplay(null)
    }
  }

  return(
    blogToDisplay === null ? null : (
      <div className="blog">
        <div className="blog-card--title" onClick={toggleVisibility}>
          {blogToDisplay.title} {blogToDisplay.author}
        </div>
        {visible && (
          <div className="blog-card">
            <a href="#">{blogToDisplay.url}</a>
            <div>
              {blogToDisplay.likes} likes
              <button onClick={() => handleLike(blogToDisplay)}>like</button>
            </div>
            <div>Added by {user && user.username}</div>
            {user && user.id === blog.user.id && (
              <div>
                <button onClick={() => handleDeleteBlog(blogToDisplay)}>Delete blog</button>
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