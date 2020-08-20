import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import group from "./group";
import challenge from "./challenge";
import submission from "./submission";
export default combineReducers({ alert, auth, group, challenge, submission });
