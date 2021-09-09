import { AsyncThunk, AnyAction } from "@reduxjs/toolkit";

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

// ref: https://redux-toolkit.js.org/api/createReducer#builderaddmatcher

type ThunkApiConfig = {
	serializedErrorType?: unknown;
};
type GenericAsyncThunk = AsyncThunk<unknown, unknown, ThunkApiConfig>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

function hasPrefix(action: AnyAction, prefix?: string) {
	return prefix && action.type.startsWith(prefix);
}

export function isPendingAction(prefix?: string) {
	return (action: AnyAction): action is PendingAction => {
		return hasPrefix(action, prefix) && action.type.endsWith("/pending");
	};
}

export function isRejectedAction(prefix?: string) {
	return (action: AnyAction): action is RejectedAction => {
		return hasPrefix(action, prefix) && action.type.endsWith("/rejected");
	};
}

export function isFulfilledAction(prefix?: string) {
	return (action: AnyAction): action is FulfilledAction => {
		return hasPrefix(action, prefix) && action.type.endsWith("/fulfilled");
	};
}
