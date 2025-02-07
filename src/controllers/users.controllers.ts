import { Context } from "hono";
import type {
  CreateUsersInput,
  UpdateUserInput,
  User,
} from "models/user.model.ts";
import * as uuid from "jsr:@std/uuid";

export async function createUserController(c: Context) {
  const input = await c.req.json<CreateUsersInput>();
  try {
    // #TODO Validate user Data
    // #TODO: User Id Validation
    const userId = (input.id && uuid.validate(input.id)) ?? crypto.randomUUID();
    // #TODO Create user on DB.

    return c.json({
      message: "User Created",
      data: {
        ...input,
        id: userId,
      },
    }, 201);
  } catch (e) {
    // #TODO Error handling
    console.error(e);
    return c.json({
      message: "Error creating User",
    }, 401);
  }
}

export async function updateUserController(c: Context) {
  const userId = c.req.param("id");

  const data = await c.req.json<UpdateUserInput>();

  try {
    // # TODO Validate Input & userId param

    return c.json({
      message: "User Updated",
      data: { ...data, id: userId } as User,
    });
  } catch (e) {
    // #TODO Error Handling
    console.error(e);
    return c.json({
      message: "Error updating Users",
    }, 401);
  }
}

export function deleteUserController(c: Context) {
  const userId = c.req.param("id");

  try {
    return c.json({
      message: "Deleted User",
      data: {
        id: userId,
      } as User,
    });
  } catch (e) {
    // #TODO error handling for possible errors
    console.error(e);
    return c.json({
      message: `Error deleting the User with Id=${userId}`,
    });
  }
}

export function getUserByIdController(c: Context) {
  const userId = c.req.param("id");

  try {
    return c.json({
      message: "User Data Retrieved",
      data: {
        id: userId,
      } as User,
    });
  } catch (e) {
    // #TODO error handling for possible errors
    console.error(e);
    return c.json({
      message: `Error getting the User with Id=${userId}`,
    });
  }
}
