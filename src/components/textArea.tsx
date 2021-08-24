import {
	FunctionComponent,
	useEffect,
	useRef,
	TextareaHTMLAttributes,
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

	return <textarea {...props} ref={textareaRef} />;
};

export default AutoTextArea;
