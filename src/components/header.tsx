import {
	Avatar,
	Box,
	BoxProps,
	chakra,
	Container,
	FormControl,
	FormLabel,
	HStack,
	Icon,
	IconButton,
	Image,
	Progress,
	Input,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { FC } from "react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import {
	AiOutlineSearch,
	AiFillHome,
	AiFillBell,
	AiOutlineQuestionCircle,
} from "react-icons/ai";
import { handleLogout } from "../redux/slices/profileSlice";
import { selectQStatus } from "../redux/slices/questionsSlice";
import { selectAStatus } from "../redux/slices/answerSlice";
import { useAppDispatch, useShallowEqSelector } from "../utils/hooks";

// images
import logo from "../images/logo.svg";

type HeaderProps = BoxProps & {
	profile: Profile;
};
const Header: FC<HeaderProps> = ({ profile, ...rest }) => {
	const dispatch = useAppDispatch();
	const qStatus = useShallowEqSelector(selectQStatus);
	const aStatus = useShallowEqSelector(selectAStatus);
	function onLogout() {
		dispatch(handleLogout());
		delete localStorage.token;
	}

	return (
		<Box
			as="header"
			bgColor="blue.500"
			color="white"
			{...rest}
			pos="fixed"
			w="100%"
			zIndex={2}
			top="0"
		>
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
				<Box flexGrow={0.26} d={{ base: "none", md: "block" }}>
					<SearchForm />
				</Box>
				<chakra.nav>
					<HStack
						as="ul"
						listStyleType="none"
						spacing="1"
						sx={{
							".chakra-icon": {
								boxSize: "6",
							},
							"a.active": {
								bgColor: "blue.700",
							},
						}}
					>
						<chakra.li>
							<IconButton
								as={NavLink}
								to="/"
								exact
								icon={<Icon as={AiFillHome} />}
								aria-label="Home"
							/>
						</chakra.li>
						<chakra.li>
							<IconButton
								as={NavLink}
								to="/notifications"
								icon={<Icon as={AiFillBell} />}
								aria-label="Notifications"
							/>
						</chakra.li>
						<chakra.li>
							<IconButton
								as={Link}
								href="https://github.com/ahmedhrayyan/sal-frontend"
								target="_blank"
								rel="noopnner"
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
											name={profile.first_name}
											src={profile.avatar || undefined}
											size="sm"
										/>
									}
									aria-label="About"
								/>
								<MenuList color="initial">
									<MenuItem
										as={RouterLink}
										to={profile.username}
										textTransform="capitalize"
									>
										{profile.full_name}
									</MenuItem>
									<MenuItem as="button" onClick={onLogout}>
										Logout
									</MenuItem>
								</MenuList>
							</Menu>
						</chakra.li>
					</HStack>
				</chakra.nav>
			</HStack>
			{(qStatus === "mutating" || aStatus === "mutating") && (
				<Progress size="md" isIndeterminate />
			)}
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
