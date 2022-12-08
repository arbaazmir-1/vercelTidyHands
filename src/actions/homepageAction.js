import {
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_FAIL,
} from "../constant/homepageConstant";
import axios from "axios";

export const homepageAction =
  ({ long, lat, token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: HOME_PAGE_REQUEST });

      //set header for authorization
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // const { data } = await axios.get(
      //   "/api/gigs/fetch?long=" + long + "&lat=" + lat + "" ,

      // );
      const { data } = await axios.get(
        "/api/gigs/fetch?long=" + long + "&lat=" + lat + "",
        config
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
