import { combineReducers } from "redux";
import questions from "./questionsSlice";

const rootReducer = combineReducers({
	questions,
});

export default rootReducer;
