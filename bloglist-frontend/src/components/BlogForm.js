import React, { useState } from 'react'
import InputField from "./InputField"
import Button from "./Button"
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [inputValue, setInputValue] = useState(null)

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setInputValue((preV) => {
      return {
        ...preV,
        [name]: value,
      }
    })
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    try {
      const title = inputValue?.title
      const author = inputValue?.author
      const url = inputValue?.url

      const blog = {
        title,
        author,
        url,
    }
    console.log(blog)
    createBlog(blog)

    setInputValue({ author: "", title: "", url: ""})
  } catch (err) {
    console.error(err)
  }
}

return (
  <form onSubmit={handleCreateBlog} class="mb-3">
    <InputField
      type="text"
      name="title"
      label="title"
      htmlFor="title"
      value={inputValue?.title || ""}
      onChange={handleInputChange}
    />
    <InputField
      type="text"
      name="author"
      label="author"
      htmlFor="author"
      value={inputValue?.author || ""}
      onChange={handleInputChange}
    />
    <InputField
      type="text"
      name="url"
      label="url"
      htmlFor="url"
      value={inputValue?.url || ""}
      onChange={handleInputChange}
    />
    <Button type="submit">
      Create
    </Button>
  </form>
)
}

export default BlogForm

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
