import loginReducer from "./reducers/LoginReducer";
import { createStore } from "redux";

const store = createStore(
  loginReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;