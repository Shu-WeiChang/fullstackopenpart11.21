import React, { useState } from 'react'
import Button from "./Button"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"


const Blog = ({blog, updateLike, removeBlog, usercheck}) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const update = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    updateLike(blog.id, updatedBlog)
  }

  const offBlog = () => {
    const id = blog.id
    removeBlog(id)
  }
  
  return (
    <main>
      <div>
        <Link to={`/blogs/${blog.id}`} class="btn btn-primary">
          {blog.title} 
        </Link>
        {/* {blog.author}
        <Button type="button" onClick={toggleVisibility}>
          {!blogVisible ? <span>view</span> : <span>hide</span>}
        </Button> */}
        {/* <Button type="button" onClick={update}>
          Like
        </Button> */}
      </div>
      {/* {blogVisible ? ( */}
        {/* <div>
          <span>{blog.url}</span><br/>
          <span className="test">{blog.likes}</span><br/>
          {blog?.user?.username === usercheck ? (
            <Button type="button" onClick={offBlog}>
              remove
            </Button>
          ) : null}         
        </div> */}
      {/* ) : null} */}
    </main>
  )
}

export default Blog

// Blog.propTypes = {
//   blog: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//     likes: PropTypes.number,
//   }),
//   updateLike: PropTypes.func.isRequired,
//   removeBlog: PropTypes.func.isRequired,
//   user: PropTypes.shape({
//     token: PropTypes.string,
//     username: PropTypes.string,
//     name: PropTypes.string,
//   }),
// }
