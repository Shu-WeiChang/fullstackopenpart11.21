import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN": {
      return action.data
    }
    default:
      return state;
  };
};

export const userLogin = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    dispatch({
      type: "LOGIN",
      data: user
    })
  }
}

export default userReducer
