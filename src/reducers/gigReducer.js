import {
  GIG_UPLOAD_REQUEST,
  GIG_UPLOAD_SUCCESS,
  GIG_UPLOAD_FAIL,
  GIG_VIEW_REQUEST,
  GIG_VIEW_SUCCESS,
  GIG_VIEW_FAIL,
} from "../constant/gigConstant";

export const gigUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case GIG_UPLOAD_REQUEST:
      return { loading: true };
    case GIG_UPLOAD_SUCCESS:
      return { loading: false, success: true };
    case GIG_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const gigViewReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case GIG_VIEW_REQUEST:
      return { loading: true };
    case GIG_VIEW_SUCCESS:
      return { loading: false, data: action.payload };
    case GIG_VIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
