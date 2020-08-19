import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import group from "./group";
import challenge from "./challenge";

export default combineReducers({ alert, auth, group, challenge });
