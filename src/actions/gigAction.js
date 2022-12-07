import {
  GIG_LIST_REQUEST,
  GIG_LIST_SUCCESS,
  GIG_LIST_FAIL,
} from "../constant/gigConstant";
import axios from "axios";

export const allGigs = () => async (dispatch) => {
  try {
    dispatch({ type: GIG_LIST_REQUEST });
    const { data } = await axios.get("/api/gigs/fetch");
    dispatch({ type: GIG_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GIG_LIST_FAIL, payload: error.message });
  }
};
