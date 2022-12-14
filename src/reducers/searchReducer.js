import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from "../constant/searchConstant";

export const searchReducer = (state = { search: [] }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { loading: true, search: [] };
    case SEARCH_SUCCESS:
      return { loading: false, search: action.payload };
    case SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
