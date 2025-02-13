import type {
  CreateUserInputType,
  UpdateUserInputType,
} from "validations/users.validations.ts";
import sql from "./client.ts";

export function createUserQuery(input: CreateUserInputType) {
  return sql`
		INSERT INTO users ${
    sql(input, "id", "email", "firstname", "lastname", "username")
  }		
		RETURNING *;

	`;
}

export function updateUserQuery(
  userId: string,
  input: UpdateUserInputType,
) {
  return sql`
	UPDATE users
	SET ${sql(input)}
	WHERE id = ${userId}
	RETURNING *;
	`;
}

export function getUserByIdQuery(userId: string) {
  return sql`
		SELECT * FROM users
		WHERE id = ${userId};
	`;
}

export function getAllUsersQuery() {
  return sql`
		SELECT * FROM users;
	`;
}

export function deleteUserQuery(userId: string) {
  return sql`
		DELETE FROM users
		where id = ${userId}
		RETURNING *;
	`;
}
