import { FC } from "react";
import { Image, ImageProps, keyframes } from "@chakra-ui/react";
import logo from "../images/logo.svg";

const fade = keyframes`
	0% {opacity: .1}
	50% {opacity: 1}
	100% {opacity: .1}
`;

const LoadingLogo: FC<ImageProps> = (props) => {
	return (
		<Image
			src={logo}
			w="128px"
			h="75px"
			filter="saturate(100%) brightness(0%)" // change color to black
			animation={`${fade} infinite 1.5s`}
			{...props}
		/>
	);
};

export default LoadingLogo;
