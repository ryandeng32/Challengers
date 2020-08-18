import { GET_GROUPS, GROUPS_ERROR, CLEAR_GROUPS } from "../actions/types";

const initialState = {
  groups: [],
  all_groups: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: payload,
        loading: false,
      };
    case GROUPS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_GROUPS:
      return {
        ...state,
        groups: [],
        loading: false,
      };
    default:
      return state;
  }
};
