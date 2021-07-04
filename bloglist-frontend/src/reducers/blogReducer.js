import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case "INIT_BLOG": {
      return action.data
    }
    case "NEW_BLOG": {
      return [...state, action.data]
    }
    case "LIKE_BLOG": {
      return [...state, action.data]
    }
    // case "REMOVE_BLOG": {
    //   return [...state, action.data]
    // }
    default:
      return state;
  };
};

export const initBlog = () => {
  return async (dispatch) => {
    const blog = await blogService.getAll()
    dispatch({
      type: "INIT_BLOG",
      data: blog
    })  
  }
}

export const newBlog = (newObject) => {
  return async (dispatch) => {
    const blog = await blogService.create(newObject)
    dispatch({
      type: "NEW_BLOG",
      data: blog
    })
  }
}

export const likeBlog = (id, newObject) => {
  return async (dispatch) => {
    const blog = await blogService.update(id, newObject)
    dispatch({
      type: "LIKE_BLOG",
      data: blog
    })
  }
}

export const delBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    const blog = await blogService.getAll()
    dispatch({
      type: "INIT_BLOG",
      data: blog
    })
  }
}

export default blogReducer
