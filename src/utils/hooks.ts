import {
	shallowEqual,
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from "react-redux";
import { AppDispatch, RootState } from "../redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useShallowEqSelector: typeof useAppSelector = (selector) =>
	useAppSelector(selector, shallowEqual);
