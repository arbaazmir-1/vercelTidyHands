import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  homePageReducer,
  homePagePayloadDeleteReducer,
} from "./reducers/homepageReducer";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  homePage: homePageReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,

  // add reducers here
});

const homePageFromStorage = localStorage.getItem("homePage")
  ? JSON.parse(localStorage.getItem("homePage"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  // add initial state here
  homePage: { data: homePageFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
