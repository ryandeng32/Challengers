import axios from "axios";

import { GET_GROUPS, GROUPS_ERROR } from "./types";

// Get current user's added groups
export const getCurrentGroups = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/groups/me");
    dispatch({ type: GET_GROUPS, payload: res.data });
  } catch (err) {
    dispatch({
      type: GROUPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
