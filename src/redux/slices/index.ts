import { combineReducers } from "redux";
import questions from "./questionsSlice";
import profile from "./profileSlice";
import users from "./usersSlice";

const rootReducer = combineReducers({
	questions,
	profile,
	users,
});

export default rootReducer;
