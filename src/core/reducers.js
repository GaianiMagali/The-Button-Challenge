import { combineReducers } from "redux";
import { userLoggedReducer } from "./login";

export default combineReducers({
    userLogged: userLoggedReducer
})