import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { homePageReducer } from "./reducers/homepageReducer";

const reducer = combineReducers({
  homePage: homePageReducer,
  // add reducers here
});
const initialState = {
  // add initial state here
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
