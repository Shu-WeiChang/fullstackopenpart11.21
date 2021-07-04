import React from 'react'
import PropTypes from 'prop-types'


const Button = ({ type, onClick, children }) => {
  return (
  <button type={type} onClick={onClick} class="btn btn-outline-warning">
    {children}
  </button>
  )
}

export default Button

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}
