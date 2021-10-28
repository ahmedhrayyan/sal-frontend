import { useState, FormEvent } from "react";
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

export const useAddFormState = (initTextArea: string) => {
	const [isOpen, setIsOpen] = useState(false); // Modal
	const [textareaValue, setTextareaValue] = useState(initTextArea);

	const onChangeHandler = (e: FormEvent<HTMLTextAreaElement>): void => {
		setTextareaValue(e.currentTarget.value);
	};
	const onOpen = () => {
		setTextareaValue(initTextArea);
		setIsOpen(true);
		// Fix weird body margin-right added by chakra
		// Ref: https://github.com/chakra-ui/chakra-ui/issues/1915
		document.body.setAttribute('style', 'margin-right: 0 !important');
	}
	const onClose = () => setIsOpen(false);
	const onCancelHandler = () => {
		setTextareaValue("");
		onClose();
	};

	return { textareaValue, isOpen, onOpen, onClose, onCancelHandler, onChangeHandler }
}
