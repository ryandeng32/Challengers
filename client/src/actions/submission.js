import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_SUBS,
  SUB_ERROR,
  UPDATE_LIKES,
  DELETE_SUB,
  ADD_SUB,
} from "./types";

// get all submissions in challenge
export const getSubs = (group_id, challenge_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/groups/${group_id}/challenges/${challenge_id}/submissions`
    );
    dispatch({
      type: GET_SUBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateLike = (group_id, challenge_id, sub_id) => async (
  dispatch
) => {
  try {
    const res = await axios.put(
      `/api/groups/${group_id}/challenges/${challenge_id}/submissions/like/${sub_id}`
    );
    dispatch({
      type: UPDATE_LIKES,
      payload: { sub_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: SUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteSub = (group_id, challenge_id, sub_id) => async (
  dispatch
) => {
  try {
    const confirm = window.confirm(
      "Do you really want to delete this challenge?"
    );
    if (confirm) {
      await axios.delete(
        `/api/groups/${group_id}/challenges/${challenge_id}/submissions/${sub_id}`
      );
      dispatch({
        type: DELETE_SUB,
        payload: sub_id,
      });
      dispatch(setAlert("Submission Deleted", "danger"));
      window.scrollTo(0, 0);
    }
  } catch (err) {
    dispatch({
      type: SUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addSub = (group_id, challenge_id, formData) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/groups/${group_id}/challenges/${challenge_id}/submissions/`,
      formData,
      config
    );
    dispatch({
      type: ADD_SUB,
      payload: res.data,
    });
    window.scrollTo(0, 0);
    dispatch(setAlert("Submission Created", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: SUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
