const getUser = (overrides?: Partial<User>) => {
	const defaultValues: User = {
		avatar: "https://i.ibb.co/vYFBKQ4/11.jpg",
		created_at: "Sat, 10 Jul 2021 13:14:28 GMT",
		job: "software dev",
		first_name: "Hossam",
		last_name: "Okasha",
		full_name: "Hossam Okasha",
		username: "hossam",
		bio: null,
	};
	return Object.assign(defaultValues, overrides);
};
export default getUser;
