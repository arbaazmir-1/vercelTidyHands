import {
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_FAIL,
  HOME_PAGE_PAYLOAD_DELETE,
  REPORT_BUG_REQUEST,
  REPORT_BUG_SUCCESS,
  REPORT_BUG_FAIL,
  LOAD_MORE_GIGS_REQUEST,
  LOAD_MORE_GIGS_SUCCESS,
  LOAD_MORE_GIGS_FAIL,
} from "../constant/homepageConstant";

export const homePageReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case HOME_PAGE_REQUEST:
      return { loading: true, loadingMore: false, data: [] };
    case HOME_PAGE_SUCCESS:
      return { loading: false, loadingMore: false, data: action.payload };
    case HOME_PAGE_FAIL:
      return { loading: false, loadingMore: false, error: action.payload };
    case LOAD_MORE_GIGS_REQUEST:
      return {
        loadingMore: true,
        data: {
          ...state.data,
        },
      };
    case LOAD_MORE_GIGS_SUCCESS:
      return {
        loadingMore: false,
        // gigs are in data of existing state

        data: {
          ...state.data,
          gigs: [...state.data.gigs, ...action.payload],
        },
      };
    case LOAD_MORE_GIGS_FAIL:
      return {
        loadingMore: false,
        data: {
          ...state.data,
        },
        errorMore: action.payload,
      };

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
