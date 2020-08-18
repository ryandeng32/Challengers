import {
  GET_GROUP,
  GET_GROUPS,
  GET_ALL_GROUPS,
  GROUPS_ERROR,
  CLEAR_GROUPS,
} from "../actions/types";

const initialState = {
  group: null,
  groups: [],
  all_groups: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_GROUP:
      return {
        ...state,
        group: payload,
        loading: false,
      };
    case GET_GROUPS:
      return {
        ...state,
        groups: payload,
        loading: false,
      };
    case GET_ALL_GROUPS:
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
