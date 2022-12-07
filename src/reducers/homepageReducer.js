import {
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_FAIL,
} from "../constant/homepageConstant";

export const homePageReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case HOME_PAGE_REQUEST:
      return { loading: true, data: [] };
    case HOME_PAGE_SUCCESS:
      return { loading: false, data: action.payload };
    case HOME_PAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};