import React from "react";
import { Link } from "react-router-dom"

const UserBlog = ({ userBlog }) => {
  return (
    <>
      <h2 class="display-2">{userBlog.name}</h2>
      <p class="fw-bolder">added blogs</p>
      {userBlog.blogs.map(blog =>
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`} class="stretched-link">
            {blog.title}
          </Link>
        </li>
      )}
    </>
  )
}

export default UserBlog
