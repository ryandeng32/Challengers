import { GET_CHALLENGES, CHALLENGE_ERROR } from "../actions/types";
const initialState = {
  challenges: [],
  challenge: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CHALLENGES:
      return {
        ...state,
        challenges: payload,
        loading: false,
      };
    case CHALLENGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
