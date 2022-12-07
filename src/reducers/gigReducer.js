import {
  GIG_LIST_REQUEST,
  GIG_LIST_SUCCESS,
  GIG_LIST_FAIL,
} from "../constant/gigConstant";
export const gigReducer = (state = { gigs: [] }, action) => {
  switch (action.type) {
    case GIG_LIST_REQUEST:
      return { loading: true, gigs: [] };
    case GIG_LIST_SUCCESS:
      return { loading: false, gigs: action.payload };
    case GIG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
