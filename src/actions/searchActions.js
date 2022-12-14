import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from "../constant/searchConstant";
import axios from "axios";

export const searchAction = (search, long, lat, token) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "/api/gigs/fetch?search=" + search + "&long=" + long + "&lat=" + lat + "",

      config
    );

    //push search to data object
    let searchQuery = search;
    data.searchQuery = searchQuery;

    dispatch({
      type: SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
