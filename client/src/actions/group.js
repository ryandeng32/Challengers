import axios from "axios";
import { setAlert } from "./alert";
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

// Create or update group
export const createGroup = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/groups", formData, config);
    dispatch({ type: GET_GROUPS, payload: res.data });
    dispatch(setAlert(edit ? "Group updated" : "Group created", "success"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    console.log("error!");
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GROUPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
