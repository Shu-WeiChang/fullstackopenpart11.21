import React, { useState } from 'react'
import InputField from './InputField.js'
import Button from './Button'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [inputValue, setInputValue] = useState(null)

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setInputValue((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      }
    })
  }

  const login = (event) => {
    event.preventDefault()
    const username = inputValue?.username
    const password = inputValue?.password

    try {
      handleLogin(username, password)
      setInputValue({ username: "", password: "" })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={login}>
      <InputField
        label="Username"
        type="text"
        name="username"
        value={inputValue?.username || ""}
        onChange={handleInputChange}
      />
      <InputField
        label="Password"
        type="text"
        name="password"
        value={inputValue?.password || ""}
        onChange={handleInputChange}
      />
      <Button type="submit">
        Login
      </Button>
    </form>
  )
}

export default LoginForm

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}


