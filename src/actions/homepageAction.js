import {
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_FAIL,
  REPORT_BUG_REQUEST,
  REPORT_BUG_SUCCESS,
  REPORT_BUG_FAIL,
  LOAD_MORE_GIGS_REQUEST,
  LOAD_MORE_GIGS_SUCCESS,
  LOAD_MORE_GIGS_FAIL,
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
        "/api/gigs/fetch?work=homegig&long=" + long + "&lat=" + lat + "",
        config
      );

      dispatch({
        type: HOME_PAGE_SUCCESS,
        payload: data,
      });
      localStorage.setItem("homepage", JSON.stringify(data));
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

export const reportBugAction =
  (title, description, token) => async (dispatch) => {
    try {
      dispatch({ type: REPORT_BUG_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/gigs/fetch?work=reportbug",
        { title, description },
        config
      );

      dispatch({
        type: REPORT_BUG_SUCCESS,
        payload: data,
      });
    } catch (error) {}
  };

export const loadMoreGigsAction =
  ({ long, lat, token, lastGigId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOAD_MORE_GIGS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        "/api/gigs/fetch?work=fetchMore&long=" +
          long +
          "&lat=" +
          lat +
          "&lastGigId=" +
          lastGigId +
          "",
        config
      );

      dispatch({
        type: LOAD_MORE_GIGS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_MORE_GIGS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
