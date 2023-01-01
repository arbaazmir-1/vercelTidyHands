import {
  GIG_UPLOAD_REQUEST,
  GIG_UPLOAD_SUCCESS,
  GIG_UPLOAD_FAIL,
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
