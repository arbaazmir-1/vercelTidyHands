import {
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_FAIL,
  HOME_PAGE_PAYLOAD_DELETE,
  REPORT_BUG_REQUEST,
  REPORT_BUG_SUCCESS,
  REPORT_BUG_FAIL,
} from "../constant/homepageConstant";

export const homePageReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case HOME_PAGE_REQUEST:
      return { loading: true, data: [] };
    case HOME_PAGE_SUCCESS:
      return { loading: false, data: action.payload };
    case HOME_PAGE_FAIL:
      return { loading: false, error: action.payload };
    case HOME_PAGE_PAYLOAD_DELETE:
      return { data: [] };

    default:
      return state;
  }
};

export const reportBugReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_BUG_REQUEST:
      return { loading: true };
    case REPORT_BUG_SUCCESS:
      return { loading: false, success: true };
    case REPORT_BUG_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
