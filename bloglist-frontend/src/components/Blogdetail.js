import React, { useState, useEffect } from "react"
import blogService from "../services/blogs"
import commentService from "../services/comment"

const Blogdetail = ({ blogdetail, addLike }) => {
  const [comment, setComment] = useState(null)
  const [showcomment, setShowComment] = useState(null)

  useEffect(() => {
    async function fetch() {
      const fetchComment = await commentService.fetchComment(blogdetail.id)
      console.log(fetchComment)
      setShowComment(fetchComment)  
    }
    fetch();
  }, [])

  const update = () => {
    const updatedBlog = {
      ...blogdetail,
      likes: blogdetail.likes + 1,
    }

    addLike(blogdetail.id, updatedBlog)
  }

  const handleChange = (event) => {
    const comment = {
      content: event.target.value
    }
    setComment(comment)
    console.log(comment)
  }

  const handleComment = (event) => {
    event.preventDefault()

    try {
      commentService.addComment(blogdetail.id, comment)
      setComment(null)
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <>
      <h2 class="fst-italic">{blogdetail.title}</h2>
      <span class="lh-base">{blogdetail.url}</span>
      <br/>
      <span class="text-start">{blogdetail.likes} likes</span>
      <button type="button" onClick={update} class="btn btn-dark">like</button>
      <br/>
      <span class="text-decoration-underline">added by {blogdetail.author}</span>
      <br/>
      <h3 class="fw-normal">comments</h3>
      <br/>
      <form onSubmit={handleComment}>
        <input type="text" onChange={handleChange} name="comment" class="form-control" aria-describedby="addon-wrapping"/>
        <button type="submit" class="btn btn-primary btn-lg">add comment</button>
      </form>
      <br/>
      {showcomment ? showcomment.map(comment =>
        <li key={comment.id} class="list-group-item">{comment.content}</li>
      ) : null}
    </>
  )
}

export default Blogdetail
