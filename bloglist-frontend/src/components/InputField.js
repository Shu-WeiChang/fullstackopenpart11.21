import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ label, type, value, onChange, name, htmlFor, id }) => {
  return (
    <div class="form-floating mb-3">
      <label htmlFor={htmlFor}>
        {label}
      </label>
      <input
        id={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        class="form-control"
      />
    </div>
  )
}

export default InputField

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
}
