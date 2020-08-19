import axios from "axios";
import { setAlert } from "./alert";
import { GET_CHALLENGES, CHALLENGE_ERROR } from "./types";

// Get challenges in a specific group
export const getChallenges = (groupId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/groups/${groupId}/challenges`);

    dispatch({
      type: GET_CHALLENGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CHALLENGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
