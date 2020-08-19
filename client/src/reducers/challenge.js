import {
  GET_CHALLENGES,
  GET_CHALLENGE,
  CHALLENGE_ERROR,
  CLEAR_CHALLENGE,
  CLEAR_CHALLENGES,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE,
  UPDATE_CHALLENGE,
  UPDATE_GROUP,
} from "../actions/types";
const initialState = {
  challenges: [],
  challenge: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CHALLENGE:
      return {
        ...state,
        challenge: payload,
        challenges: state.challenges.map((challenge) =>
          challenge._id === payload._id ? payload : challenge
        ),
        loading: false,
      };
    case CREATE_CHALLENGE:
      return {
        ...state,
        challenges: state.challenges.concat(payload),
        loading: false,
      };
    case DELETE_CHALLENGE:
      return {
        ...state,
        challenges: state.challenges.filter(
          (challenge) => challenge._id !== payload
        ),
        loading: false,
      };
    case GET_CHALLENGE:
      return {
        ...state,
        challenge: payload,
        loading: false,
      };
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
    case CLEAR_CHALLENGES:
      return {
        ...state,
        error: null,
        challenges: [],
      };
    case CLEAR_CHALLENGE:
      return {
        ...state,
        error: null,
        challenge: null,
      };
    default:
      return state;
  }
};
