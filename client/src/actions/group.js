import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_GROUPS,
  GET_GROUP,
  GET_ALL_GROUPS,
  GROUPS_ERROR,
  CLEAR_GROUPS,
} from "./types";

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

// Get all groups
export const getGroups = () => async (dispatch) => {
  dispatch({ type: CLEAR_GROUPS });
  try {
    const res = await axios.get("/api/groups");
    dispatch({ type: GET_ALL_GROUPS, payload: res.data });
  } catch (err) {
    dispatch({
      type: GROUPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get group by ID
export const getGroupById = (groupId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/groups/${groupId}`);
    dispatch({ type: GET_GROUP, payload: res.data });
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
