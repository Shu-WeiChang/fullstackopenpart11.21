import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(({ btnText, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className="newblog">
      <Button
        style={hideWhenVisible}
        type="button"
        onClick={toggleVisibility}
      >
        {btnText}
      </Button>
      {/* <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div> */}
      <div style={showWhenVisible}>
        {children}
        {/* <button onClick={toggleVisibility}>cancel</button> */}
        <Button
          type="button"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = "Togglable"

export default Togglable

Togglable.propTypes = {
  btnText: PropTypes.string.isRequired,
  children: PropTypes.node,
}
