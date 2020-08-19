import {
  GET_GROUP,
  GET_GROUPS,
  GET_ALL_GROUPS,
  GROUPS_ERROR,
  CLEAR_GROUP,
  CLEAR_GROUPS,
  CREATE_GROUP,
  ADD_GROUP,
  DELETE_GROUP,
  UPDATE_GROUP,
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
        all_groups: payload,
        loading: false,
      };
    case CREATE_GROUP:
    case ADD_GROUP:
      return {
        ...state,
        groups: state.groups.concat(payload),
        all_groups: state.all_groups.concat(payload),
        loading: false,
      };
    case GROUPS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_GROUP:
      return {
        ...state,
        group: null,
        error: null,
      };
    case CLEAR_GROUPS:
      return {
        ...state,
        groups: [],
        error: null,
      };
    case UPDATE_GROUP:
      return {
        ...state,
        group: payload,
        groups: state.groups.map((group) =>
          group._id === payload._id ? payload : group
        ),
        all_groups: state.all_groups.map((group) =>
          group._id === payload._id ? payload : group
        ),
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group._id !== payload),
      };
    default:
      return state;
  }
};
