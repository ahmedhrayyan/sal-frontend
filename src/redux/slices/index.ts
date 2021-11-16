import { combineReducers } from "redux";
import questions from "./questionsSlice";
import profile from "./profileSlice";
import users from "./usersSlice";
import answers from "./answerSlice";
import notifications from "./notificationsSlice";

const rootReducer = combineReducers({
	questions,
	answers,
	profile,
	users,
	notifications,
});

export default rootReducer;
