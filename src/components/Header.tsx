import {
	Avatar,
	Box,
	chakra,
	Container,
	FormControl,
	FormLabel,
	HStack,
	Icon,
	IconButton,
	Image,
	Input,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	AiOutlineSearch,
	AiFillHome,
	AiFillBell,
	AiOutlineQuestionCircle,
} from "react-icons/ai";

// images
import logo from "../images/logo.svg";

type HeaderProps = {};
const Header: FC<HeaderProps> = (props) => {
	return (
		<Box as="header" bgColor="blue.500" color="white">
			<HStack as={Container} spacing="4" justify="space-between" py="14px">
				<Box>
					<Link as={RouterLink} to="/" d="inline-block" h="32px">
						<Image src={logo} alt="Sal" height="100%" />
					</Link>
					<chakra.span
						d={{ base: "none", md: "inline" }}
						as="span"
						ms="2"
						verticalAlign="text-bottom"
						fontStyle="italic"
					>
						any question
					</chakra.span>
				</Box>
				<Box flexGrow={0.4} d={{ base: "none", sm: "block" }}>
					<SearchForm />
				</Box>
				<chakra.nav>
					<chakra.ul
						listStyleType="none"
						d="flex"
						alignItems="center"
						sx={{
							".chakra-icon": {
								boxSize: "6",
							},
						}}
					>
						<chakra.li>
							<IconButton
								as={Link}
								icon={<Icon as={AiFillHome} />}
								aria-label="Home"
								isActive
							/>
						</chakra.li>
						<chakra.li>
							<IconButton
								icon={<Icon as={AiFillBell} />}
								aria-label="Notifications"
							/>
						</chakra.li>
						<chakra.li>
							<IconButton
								icon={<Icon as={AiOutlineQuestionCircle} />}
								aria-label="About"
							/>
						</chakra.li>
						<chakra.li>
							<Menu>
								<MenuButton
									as={IconButton}
									icon={
										<Avatar
											name="Ahmed Hamed"
											src="https://placebeard.it/120/120"
											size="sm"
										/>
									}
									aria-label="About"
								/>
								<MenuList color="initial">
									<MenuItem>Ahmed Hamed</MenuItem>
								</MenuList>
							</Menu>
						</chakra.li>
					</chakra.ul>
				</chakra.nav>
			</HStack>
		</Box>
	);
};

type SearchProps = {};
const SearchForm: FC<SearchProps> = (props) => {
	return (
		<chakra.form>
			<FormControl>
				<FormLabel srOnly>Search</FormLabel>
				<Input
					type="search"
					placeholder="Search..."
					ps="10"
					bgColor="rgba(255, 255, 255, 0.2)"
					borderColor="transparent !important"
					_placeholder={{ color: "gray.200" }}
					sx={{
						"&::-webkit-search-cancel-button": {
							d: "none",
						},
					}}
				/>
				<Icon
					as={AiOutlineSearch}
					pos="absolute"
					insetInlineStart="4"
					top="50%"
					transform="translateY(-50%)"
					boxSize="5"
				/>
			</FormControl>
		</chakra.form>
	);
};

export default Header;
