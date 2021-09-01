import { combineReducers } from "redux";
import questions from "./questionsSlice";
import auth from "./authSlice";

const rootReducer = combineReducers({
	questions,
	auth
});

export default rootReducer;
