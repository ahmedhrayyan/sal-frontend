import { Button, Stack, Center } from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import QuestionView from "../components/questionView";
import { FC } from "react";
import { useShallowEqSelector } from "../utils/hooks";
import { selectProfile } from "../redux/slices/profileSlice";
import { selectQuestion } from "../redux/slices/questionsSlice";

interface QuestionViewProps {}
const Question: FC<QuestionViewProps> = () => {
	const history = useHistory();
	const { qId } = useParams() as { qId: string | undefined };
	const currentUser = useShallowEqSelector(selectProfile);
	const question = useShallowEqSelector((state) =>
		selectQuestion(state, Number(qId))
	);
	return (
		<Center mt="13vh">
			<Stack
				w={["full", "90vw"]}
				maxW={"xl"}
				spacing="2"
				alignItems="flex-start"
			>
				<Button onClick={() => history.goBack()} w={[20, 32]} h={[7, 10]}>
					Back
				</Button>
				<QuestionView question={question} currentUser={currentUser} />
			</Stack>
		</Center>
	);
};

export default Question;

