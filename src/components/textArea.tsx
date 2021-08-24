import {
	FunctionComponent,
	useEffect,
	useRef,
	TextareaHTMLAttributes,
  FocusEventHandler
} from "react";

const AutoTextArea: FunctionComponent = (
	props: TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // auto size
	useEffect(() => {
		if (textareaRef && textareaRef.current) {
			textareaRef.current.style.height = "0px";
			const scrollHeight = textareaRef.current.scrollHeight;
			textareaRef.current.style.height = scrollHeight + "px";
		}
	}, [props.value]);

  // move focus after the last char
  // ref: https://gist.github.com/piyonishi/409ecbd07f7b86b7da205ad61210a275
  const moveCaretToEnd: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    let temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  };


	return <textarea {...props} ref={textareaRef} onFocus={moveCaretToEnd}/>;
};

export default AutoTextArea;
