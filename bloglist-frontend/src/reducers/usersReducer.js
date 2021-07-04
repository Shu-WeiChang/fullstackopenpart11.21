import usersService from "../services/users"

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH": {
      return action.data
    }
    default: 
      return state
  };
};

export const userFetch = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers()
    dispatch({
      type: "FETCH",
      data: users
    })
  }
}

export default usersReducer
