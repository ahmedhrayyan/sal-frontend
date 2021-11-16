import { schema } from "normalizr";

export const userEntity = new schema.Entity<User>(
	"users",
	{},
	{ idAttribute: "username" } // the unique field in users is username
);
export const qEntity = new schema.Entity<Question>("questions", {
	user: userEntity,
});

export const aEntity = new schema.Entity<Answer>("answers", {
	user: userEntity,
});

export const notificationEntity = new schema.Entity<APINotification>(
	"notifications"
);
