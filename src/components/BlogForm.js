import React, { useState } from 'react'
import { connect } from 'react-redux'

import { notify } from './notificationReducer'
import { createBlog } from './blogReducer'

const BlogForm = ({ createBlog, notify }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (e) => {
    e.preventDefault()
    try {
      createBlog({ title, author, url })
      setAuthor('')
      setTitle('')
      setUrl('')
      notify({ msg: `new blog ${title} created!`, type: 'success' })
    } catch (error) {
      console.log(error.response)
      setAuthor('')
      setTitle('')
      setUrl('')
      notify({ msg: error.response.data.error || 'some went wrong', type: 'error' })
    }
  }

  return (
    <form onSubmit={handleNewBlog}>
      <h2>Add new Blog</h2>
      <div>Title: <input name="title" value={title} onChange={e => setTitle(e.target.value)} /></div>
      <div>Author: <input name="author" value={author} onChange={e => setAuthor(e.target.value)} /></div>
      <div>Url: <input name="url" value={url} onChange={e => setUrl(e.target.value)} /></div>
      <button type="submit">Add blog </button>
    </form>
  )
}

const mapDispatchToProps = {
  createBlog, notify
}

export default connect(null, mapDispatchToProps)(BlogForm)

