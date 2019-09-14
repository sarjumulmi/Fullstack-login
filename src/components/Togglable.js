import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisibleStyle = { display: visible ? 'none' : '' }
  const showWhenVisibleStyle = { display: visible ? '' : 'none' }

  const toggleVisibility = () => { setVisible(!visible)}

  return (
    <div>
      <div style={hideWhenVisibleStyle}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisibleStyle}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable