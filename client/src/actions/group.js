import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_GROUPS,
  GET_GROUP,
  GET_ALL_GROUPS,
  GROUPS_ERROR,
  CLEAR_GROUP,
  CREATE_GROUP,
  ADD_GROUP,
  DELETE_GROUP,
  UPDATE_GROUP,
  CLEAR_CHALLENGES,
} from "./types";

// Get current user's added groups
export const getCurrentGroups = () => async (dispatch) => {
  dispatch({ type: CLEAR_GROUP });
  try {
    const res = await axios.get("/api/groups/me");
    dispatch({ type: GET_GROUPS, payload: res.data });
    dispatch({ type: CLEAR_CHALLENGES });
  } catch (err) {
    dispatch({
      type: GROUPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all groups
export const getGroups = () => async (dispatch) => {
  dispatch({ type: CLEAR_GROUP });
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

// Join group
export const addGroupById = (groupId, history) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/groups/${groupId}/users`);
    dispatch({ type: ADD_GROUP, payload: res.data });
    history.push("/groups");
    dispatch(setAlert("Group added", "success"));
  } catch (err) {
    dispatch({
      type: GROUPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete group
export const deleteGroupById = (groupId, history) => async (dispatch) => {
  try {
    const confirm = window.confirm("Do you really want to delete this group?");
    if (confirm) {
      await axios.delete(`/api/groups/${groupId}`);
      dispatch({ type: DELETE_GROUP, payload: groupId });
      dispatch(setAlert("Group removed", "danger"));
      history.push("/groups");
    }
  } catch (err) {
    dispatch({
      type: GROUPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create
export const createGroup = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/groups", formData, config);
    dispatch({ type: CREATE_GROUP, payload: res.data });
    dispatch(setAlert("Group created", "success"));
    history.push("/dashboard");
  } catch (err) {
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

// Edit
export const editGroup = (formData, history, groupId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/groups/${groupId}`, formData, config);
    dispatch({ type: UPDATE_GROUP, payload: res.data });
    dispatch(setAlert("Edit Saved ", "success"));
    history.push("/dashboard");
  } catch (err) {
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
