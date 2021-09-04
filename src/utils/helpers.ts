// ref: https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
const intervals = [
	{ label: "year", seconds: 31536000 },
	{ label: "month", seconds: 2592000 },
	{ label: "day", seconds: 86400 },
	{ label: "hour", seconds: 3600 },
	{ label: "minute", seconds: 60 },
	{ label: "second", seconds: 1 },
];

export const formatTimeAgo = (date: Date) => {
	const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
	const interval = intervals.find((i) => i.seconds < seconds);
	const count = Math.floor(seconds / interval!.seconds);
	return `${count} ${interval!.label}${count !== 1 ? "s" : ""} ago`;
};

export const formatKNumbers = (num: number) => {
	// replace method to remove .0 for 1K, 2K ...etc
	// $: to match the end. \: escape sequence.
	return num > 999 ? `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K` : num;
};

/** Alter item like how a call to vote endpoint would, useful for optimistic updates */
export function changeVote(
	item: { downvotes: number; upvotes: number; viewer_vote: null | boolean },
	vote: Vote
) {
	switch (vote) {
		case 0:
			// handle removing vote
			if (item.viewer_vote === false) item.downvotes -= 1;
			else if (item.viewer_vote) item.upvotes -= 1;
			item.viewer_vote = null;
			break;
		case 1:
			// handle upvote
			if (item.viewer_vote === false) item.downvotes -= 1;
			item.upvotes += 1;
			item.viewer_vote = true;
			break;
		case 2:
			// handle downvote
			if (item.viewer_vote) item.upvotes -= 1;
			item.downvotes += 1;
			item.viewer_vote = false;
	}
}
