import {
  GET_SUBS,
  SUB_ERROR,
  UPDATE_LIKES,
  DELETE_SUB,
  ADD_SUB,
  GET_SUB,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";

const initialState = {
  subs: [],
  sub: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_COMMENT:
      return {
        ...state,
        sub: { ...state.sub, comments: payload },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        sub: {
          ...state.sub,
          comments: state.sub.comments.filter(
            (comment) => comment._id !== payload
          ),
          loading: false,
        },
      };
    case GET_SUB: {
      return { ...state, sub: payload, loading: false };
    }
    case ADD_SUB: {
      return {
        ...state,
        subs: [payload, ...state.subs],
        loading: false,
      };
    }
    case DELETE_SUB:
      return {
        ...state,
        subs: state.subs.filter((sub) => sub._id !== payload),
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        sub:
          state.sub && state.sub._id === payload.sub_id
            ? { ...state.sub, likes: payload.likes }
            : state.sub,
        subs: state.subs.map((sub) =>
          sub._id === payload.sub_id ? { ...sub, likes: payload.likes } : sub
        ),
        loading: false,
      };
    case GET_SUBS:
      return {
        ...state,
        subs: payload,
        loading: false,
      };
    case SUB_ERROR:
      return {
        ...state,
        errpr: payload,
        loading: false,
      };
    default:
      return state;
  }
};
