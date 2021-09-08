import { schema } from "normalizr";

export const userEntity = new schema.Entity<User>(
	"users",
	{},
	{ idAttribute: "username" } // the unique field in users is username
);
export const qEntity = new schema.Entity<Question>("questions", {
	user: userEntity,
});
