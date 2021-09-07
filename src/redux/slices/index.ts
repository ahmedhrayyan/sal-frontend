import { combineReducers } from "redux";
import questions from "./questionsSlice";
import profile from "./profileSlice";

const rootReducer = combineReducers({
	questions,
	profile
});

export default rootReducer;
