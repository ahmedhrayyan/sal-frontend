type LoadingStatus = "idle" | "pending" | "storing" | "failed" | "succeeded";

type Question = {
	accepted_answer: null | number;
	answers_count: number;
	content: string;
	created_at: string;
	downvotes: number;
	id: number;
	upvotes: number;
	user: number;
	viewer_vote: null;
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
};

type Entity<T> = Record<number, T>;
type Result<T = any> = {
	success: boolean;
	data: T;
	meta: {
		current_page: number;
		per_page: number;
		total: number;
	};
};
