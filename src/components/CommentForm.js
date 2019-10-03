import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addComment } from './blogReducer'
import { notify } from './notificationReducer'

const CommentForm = ({ blog, addComment }) => {
  const [ comment, setComment ] = useState('')

  const handleAddComment = e => {
    e.preventDefault()
    try {
      addComment(blog, { content: comment })
      setComment('')
      notify({ msg: 'new comment added', type: 'success' })
    } catch (error) {
      console.log(error.response)
      setComment('')
      notify({ msg: error.response.data.error || 'some went wrong', type: 'error' })
    }
  }

  return (
    <form onSubmit={handleAddComment}>
      <input value={comment} onChange={e => setComment(e.target.value)} />
      <button type="submit">add comment</button>
    </form>
  )
}

const mapDispatchToProps = {
  addComment
}

export default connect(null, mapDispatchToProps)(CommentForm)