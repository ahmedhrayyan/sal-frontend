const getNotification = (overrides: Partial<APINotification> = {}) => {
	const defaultValues: APINotification = {
		id: 1,
		content:
			'Your question has new upvote "Is this is the best site in the world?"',
		url: "/questions/1",
		is_read: false,
		created_at: "Wed, 03 Nov 2021 21:39:43 GMT",
	};
	return Object.assign(defaultValues, overrides);
};
export default getNotification;
