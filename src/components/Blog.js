import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    blog === null ? null : (
      <div className="blog">
        <div className="blog-card--title" onClick={toggleVisibility}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      </div>
    )
  )
}

export default Blog