import React from 'react'

const Notification = ({ message }) => (
  <div className={message.type}>
    {message.msg}
  </div>
)

export default Notification