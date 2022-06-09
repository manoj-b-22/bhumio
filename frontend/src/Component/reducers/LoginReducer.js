let initialState = {
  loginSuccess: false,
};

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case "loginSuccess":
      return {
        ...state,
        loginSuccess: true,
      };
    case "loginFail":
      return {
        ...state,
        loginSuccess: false,
      };
    case "logOut":
      return {
        ...state,
        loginSuccess: false,
      };
    default:
      return state;
  }
}

export default LoginReducer;