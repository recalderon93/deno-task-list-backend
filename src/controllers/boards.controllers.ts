import type { Context } from "hono";
import type {
  CreateBoardInputType,
  UpdateBoardNameInputType,
} from "validations/board.validation.ts";
import {
  validateBoardIdInput,
  validateBoardUserIdInput,
  validateCreateBoardInput,
  validateUpdateBoardTitleInput,
} from "validations/board.validation.ts";
import {
  changeBoardOwnershipQuery,
  createBoardQuery,
  deleteBoardQuery,
  getBoardByIdQuery,
  getBoardsByUserQuery,
  updateBoardTitleQuery,
} from "../db/boards.queries.ts";
import HTTP_STATUS, { getErrorStatus } from "constants/httpStatus.ts";
import { apiResponse } from "utils/apiResponseHelper.ts";
import { BOARDS, USERS } from "constants/api-messages.ts";
import { ChangeBoardOwnershipInputType } from "validations/board.validation.ts";
import { validateChangeBoardOwnershipInput } from "validations/board.validation.ts";

export async function createBoardController(c: Context) {
  const input = await c.req.json<CreateBoardInputType>();

  try {
    // #TODO Validate Input
    await validateCreateBoardInput(input);
    const response = await createBoardQuery(input);
    const status = HTTP_STATUS.CREATED;

    return apiResponse(c, response, BOARDS.CREATED, status);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, USERS.CREATED_ERROR, status, e);
  }
}

export async function deleteBoardController(c: Context) {
  const boardId = c.req.param("id");

  try {
    await validateBoardIdInput(boardId);
    const response = await deleteBoardQuery(boardId);
    const status = HTTP_STATUS.OK;

    return apiResponse(c, response, BOARDS.DELETED, status);
  } catch (e) {
    const status = getErrorStatus(e);
    return apiResponse(c, null, BOARDS.DELETED, status, e);
  }
}

export async function getBoardByIdController(c: Context) {
  const boardId = c.req.param("id");

  try {
    await validateBoardIdInput(boardId);
    const response = await getBoardByIdQuery(boardId);
    const status = HTTP_STATUS.OK;

    return apiResponse(c, response, BOARDS.GET, status);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, BOARDS.GET_ERROR, status, e);
  }
}

export async function getBoardsByUserController(c: Context) {
  const userId = c.req.param("id");

  try {
    await validateBoardUserIdInput(userId);
    const response = await getBoardsByUserQuery(userId);
    const status = HTTP_STATUS.OK;
    const message = BOARDS.GET_BY_USER;

    return apiResponse(c, response, message, status);
  } catch (e) {
    const status = getErrorStatus(e);
    const message = BOARDS.GET_BY_USER_ERROR;

    return apiResponse(c, null, message, status, e);
  }
}

export async function updateBoardTitleController(c: Context) {
  const boardId = c.req.param("id");
  const input = await c.req.json<UpdateBoardNameInputType>();

  try {
    await validateBoardIdInput(boardId);
    await validateUpdateBoardTitleInput(input);
    const response = await updateBoardTitleQuery(boardId, input);
    const status = HTTP_STATUS.OK;

    return apiResponse(c, response, BOARDS.UPDATED, status);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, BOARDS.UPDATED_ERROR, status, e);
  }
}

export async function changeBoardOwnershipController(c: Context) {
  const boardId = c.req.param("id");
  const input = await c.req.json<ChangeBoardOwnershipInputType>();

  try {
    await validateBoardIdInput(boardId);
    await validateChangeBoardOwnershipInput(input);
    const response = await changeBoardOwnershipQuery(boardId, input);
    const status = HTTP_STATUS.OK;

    return apiResponse(c, response, BOARDS.UPDATED, status);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, BOARDS.UPDATED_ERROR, status);
  }
}
