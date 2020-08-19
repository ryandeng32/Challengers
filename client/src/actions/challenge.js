import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_CHALLENGES,
  CHALLENGE_ERROR,
  GET_CHALLENGE,
  CLEAR_CHALLENGE,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE,
  UPDATE_CHALLENGE,
} from "./types";

// Get challenges in a specific group
export const getChallenges = (groupId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/groups/${groupId}/challenges`);

    dispatch({
      type: GET_CHALLENGES,
      payload: res.data,
    });
    dispatch({ type: CLEAR_CHALLENGE });
  } catch (err) {
    dispatch({
      type: CHALLENGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get challenge by challengeID
export const getChallenge = (groupId, challengeID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/groups/${groupId}/challenges/${challengeID}`
    );
    dispatch({
      type: GET_CHALLENGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CHALLENGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create new challenge in group with groupId
export const createChallenge = (formData, groupId, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/groups/${groupId}/challenges`,
      formData,
      config
    );
    dispatch({ type: CREATE_CHALLENGE, payload: res.data });
    dispatch(setAlert("Challenge created", "success"));
    history.push(`/groups/${groupId}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CHALLENGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete challenge with challengeId
// Delete group
export const deleteChallenge = (group_id, challenge_id, history) => async (
  dispatch
) => {
  try {
    const confirm = window.confirm(
      "Do you really want to delete this challenge?"
    );
    if (confirm) {
      await axios.delete(`/api/groups/${group_id}/challenges/${challenge_id}`);
      dispatch({ type: DELETE_CHALLENGE, payload: challenge_id });
      dispatch(setAlert("Challenge removed", "danger"));
      history.push(`/groups/${group_id}`);
    }
  } catch (err) {
    dispatch({
      type: CHALLENGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit
export const editChallenge = (
  formData,
  history,
  group_id,
  challenge_id
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/groups/${group_id}/challenges/${challenge_id}`,
      formData,
      config
    );
    dispatch({ type: UPDATE_CHALLENGE, payload: res.data });
    dispatch(setAlert("Edit Saved ", "success"));
    history.push(`/groups/${group_id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CHALLENGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
