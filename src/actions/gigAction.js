import {
  GIG_VIEW_REQUEST,
  GIG_VIEW_SUCCESS,
  GIG_VIEW_FAIL,
} from "../constant/gigConstant";
import axios from "axios";

export const gigViewAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: GIG_VIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/gigs/crud?id=${id}`, config);
    const { gig } = data;
    dispatch({ type: GIG_VIEW_SUCCESS, payload: gig });
  } catch (e) {
    dispatch({ type: GIG_VIEW_FAIL, payload: e.message });
  }
};
