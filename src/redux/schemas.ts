import { schema } from "normalizr";

export const userEntity = new schema.Entity<User>("users");
export const questionEntity = new schema.Entity<Question>("questions", {
	user: userEntity,
});
