import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import usersService from "./services/users"
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blogdetail from "./components/Blogdetail"
import { useDispatch, useSelector } from "react-redux"
import notificationReducer, { setNotification } from "./reducers/notificationReducer"
import { initBlog, newBlog, likeBlog, delBlog } from "./reducers/blogReducer"
import { userLogin } from "./reducers/userReducer"
import { userFetch } from "./reducers/usersReducer"
import Notification from "./components/Notification"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import Users from "./components/Users"
import UserBlog from "./components/UserBlog"

// still need to work on
// notification, logout, aesthetic, backend comment database

const App = () => {
  const dispatch = useDispatch()
  // const [blogs, setBlogs] = useState([])
  // const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()
  
  // login
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)  
  const handleLogin = async (username, password) => {
    try {
      dispatch(userLogin({
        username, password,
      }))
      dispatch(userFetch())

      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      await blogService.setToken(user.token)
      // setUser(user)
    } catch (err) {
      setNotification("Wrong credentials", 5)
    }
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   // setUser(user)
    //   blogService.setToken(user.token)
    // }
  }, [])

  // fetch blogs
  useEffect(() => {
    dispatch(initBlog())
  }, [])

  const blogs = useSelector(state => state.blog)
  console.log(blogs)

  // useEffect(() => {
  //   setBlogs(blog)
  // }, [blog])
  // console.log(blogs)


  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs(blogs)
  //   )  
  // }, [])

  


  const handleLogout = async (event) => {
    event.preventDefault()

    
    window.localStorage.removeItem("loggedBlogappUser")
    blogService.setToken("")
    // setUser(null)
  }

  const addBlog = (newObject) => {
    dispatch(newBlog(newObject))
    setNotification("A new blog added", 5)
  }

  // add functions
  // const addBlog = async (blogObject) => {
  //   await console.log(blogObject)
  //   await blogService.create(blogObject)
  //   const updatedBlogs = await blogService.getAll()
  //   await console.log(updatedBlogs)
  //   setBlogs(updatedBlogs)
  //   setNotification("A new blog added", 5)
  // }

  const addLike = async (id, newObject) => {
    try {
      await dispatch(likeBlog(id, newObject))
      setNotification("liked", 5)
    } catch (err) {
      setNotification("no", 5)
    }
  }

  // const addLike = async (id, blogObject) => {
  //   try {
  //     await blogService.update(id, blogObject)

  //     const updatedBlog = {
  //       ...blogObject,
  //       id,
  //     }

  //     setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
  //     setNotification("liked", 5)
  //   } catch (err) {
  //     console.error(err)
  //     setNotification("no", 5)
  //   }
  // }

  const removeBlog = async (id) => {
    try {
      if (window.confirm("remove?")) {
        await dispatch(delBlog(id))
        // console.log("after del", blog)
      }
      setNotification("remove successfully", 5)
    } catch (err) {
      console.error(err)
      setNotification("no!", 5)
    }
  }

  // const removeBlog = async (id) => {
  //   try {
  //     const blog = blogs.filter((blog) => blog.id === id)

  //     if (window.confirm("remove?")) {
  //       await blogService.remove(id)

  //       setBlogs(blogs.filter((blog) => blog.id !== id))
  //     }
  //     setNotification("remove successfully", 5)
  //   } catch (err) {
  //     console.error(err)
  //     setNotification("no!", 5)
  //   }
  // }
  // route match
  const match = useRouteMatch("/users/:id")
  const userBlog = match ? 
    users.find(user => user.id === match.params.id) :
    null

  const blogmatch = useRouteMatch("/blogs/:id")
  const blogdetail = blogmatch ?
    blogs.find(blog => blog.id === blogmatch.params.id) :
    null


  if (user === null) {
    return (
      <main>
        <div>
          <h2>Log in to application</h2>
        </div>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </main>
    )
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/blogs">blogs</a>
          <a class="navbar-brand" href="/users">users</a>
          <span>{user.name} logged in 
          <button class="navbar-toggler" onClick={handleLogout}>logout</button></span>
        </div>
      </nav>
      <div>
        <h2 class="text-center">blogs</h2>
      </div>
      <Notification />
      <Switch>
        <Route exact path="/">
          <div>
            <h2 class="badge bg-primary text-wrap">Users</h2>
          </div>
          <table class="table">
            <tbody>
              <tr>
                <th></th>
                <th scope="col">blogs created</th>
              </tr>
              <Users users={users} />
            </tbody>
          </table>
          <div>
            <h2 class="text-sm-start">create new</h2>
            <Togglable btnText="New Blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
          </div>
          {blogs.sort((a, b) => b.likes - a.likes)
            .map(blog =>
            <Blog key={blog.id} blog={blog} updateLike={addLike} removeBlog={removeBlog} usercheck={user.username}/>
          )}
        </Route>
        <Route path="/users/:id">
          <UserBlog userBlog={userBlog} />
        </Route>
        <Route path="/blogs/:id">
          <Blogdetail blogdetail={blogdetail} addLike={addLike} />
        </Route>
      </Switch>
    </>
  )
}

export default App
