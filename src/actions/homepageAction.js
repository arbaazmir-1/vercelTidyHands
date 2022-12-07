import {
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_FAIL,
} from "../constant/homepageConstant";
import axios from "axios";

export const homepageAction =
  ({ long, lat }) =>
  async (dispatch) => {
    try {
      dispatch({ type: HOME_PAGE_REQUEST });

      const { data } = await axios.get(
        "/api/gigs/fetch?long=" + long + "&lat=" + lat + ""
      );

      dispatch({
        type: HOME_PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: HOME_PAGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
