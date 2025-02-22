import { Context } from "hono";
import {
  createUserQuery,
  deleteUserQuery,
  getUserByIdQuery,
  updateUserQuery,
} from "../db/users.queries.ts";
import {
  type CreateUserInputType,
  type UpdateUserInputType,
  validateCreateUserInput,
  validateUpdateUserInput,
  validateUserIdInput,
} from "validations/user.validations.ts";
import HTTP_STATUS, { getErrorStatus } from "constants/httpStatus.ts";
import { apiResponse } from "utils/apiResponseHelper.ts";
import { USERS } from "constants/api-messages.ts";

export async function createUserController(c: Context) {
  const input = await c.req.json<CreateUserInputType>();
  try {
    await validateCreateUserInput(input);
    const response = await createUserQuery(input);
    const status = HTTP_STATUS.CREATED;

    return apiResponse(c, response, USERS.CREATED, status);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, USERS.CREATED_ERROR, status, e);
  }
}

export async function updateUserController(c: Context) {
  const userId = c.req.param("id");

  const data = await c.req.json<UpdateUserInputType>();

  try {
    await validateUpdateUserInput({
      ...data,
      id: userId,
    });
    const response = await updateUserQuery(
      userId,
      data,
    );
    const status = HTTP_STATUS.OK;
    if (response[0]) {
      return apiResponse(c, response[0], USERS.UPDATED, status);
    }
    return apiResponse(c, null, USERS.NO_USER, HTTP_STATUS.NOT_FOUND);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, USERS.UPDATED_ERROR, status, e);
  }
}

export async function deleteUserController(c: Context) {
  const userId = c.req.param("id");

  try {
    await validateUserIdInput(userId);

    const response = await deleteUserQuery(userId);
    const status = HTTP_STATUS.OK;

    if (response[0]) {
      return apiResponse(c, response[0], USERS.DELETED, status);
    }

    return apiResponse(c, null, USERS.NO_USER, HTTP_STATUS.NOT_FOUND);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, USERS.DELETED_ERROR, status, e);
  }
}

export async function getUserByIdController(c: Context) {
  const userId = c.req.param("id");

  try {
    await validateUserIdInput(userId);
    const response = await getUserByIdQuery(userId);

    if (response[0]) {
      return apiResponse(c, response[0], USERS.GET, HTTP_STATUS.OK);
    }
    return apiResponse(c, null, USERS.NO_USER, HTTP_STATUS.NOT_FOUND);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, USERS.GET_ERROR, status, e);
  }
}
