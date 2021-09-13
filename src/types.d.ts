// mutating below refers to any db mutations like deleting or adding
type LoadingStatus = "idle" | "pending" | "mutating" | "failed" | "succeeded";

type LoginData = {
	username: string;
	password: string;
};

type RegisterData = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	username: string;
};

type Vote = 0 | 1 | 2; // 0 for unvote, 1 for upvote and 2 for downvote

type Question = {
	accepted_answer: null | number;
	answers_count: number;
	content: string;
	created_at: string;
	downvotes: number;
	id: number;
	upvotes: number;
	user: number;
	viewer_vote: null | boolean;
	fetchedAPages?: number[] // client side, used for pagination 
};

type User = {
	avatar: null | string;
	bio: null | string;
	created_at: string;
	first_name: string;
	full_name: string;
	job: string | null;
	last_name: string;
	username: string;
	answers_count: number;
	questions_count: number;
	fetchedQPages?: number[] // client side, used for pagination
};

type Answer = {
	id: number;
	content: string;
	created_at: string;
	downvotes: number;
	upvotes: number;
	user: string;
	viewer_vote: null | boolean;
	question_id: number;
};

type Profile = User & {
	id: number;
	email: string;
	phone: null | string;
};

type Result<T = any> = {
	success: boolean;
	data: T;
	meta: {
		current_page: number;
		per_page: number;
		total: number;
	};
};
