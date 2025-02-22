import { Context } from "hono";
import type { Task } from "models/task.model.ts";
import type {
  ChangeTaskStatusInputType,
  CreateTaskInputType,
  UpdateTaskInputType,
} from "validations/task.validations.ts";
import {
  changeTaskStatusQuery,
  createTaskQuery,
  deleteTaskQuery,
  getTasksByBoardIdQuery,
  updateTaskQuery,
} from "db/tasks.queries.ts";
import {
  validateChangeTaskStatusInput,
  validateCreateTaskInput,
  validateTaskBoardIdInput,
  validateTaskIdInput,
  validateUpdateTaskInput,
} from "validations/task.validations.ts";
import { TASKS } from "constants/api-messages.ts";
import HTTP_STATUS, { getErrorStatus } from "constants/httpStatus.ts";
import { apiResponse } from "utils/apiResponseHelper.ts";

export async function getTasksByBoardIdController(c: Context) {
  const boardId = c.req.param("id");

  try {
    await validateTaskBoardIdInput(boardId);
    const response = await getTasksByBoardIdQuery(boardId);
    const status = HTTP_STATUS.OK;

    return apiResponse(c, response, TASKS.GET_BY_BOARD, status);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, TASKS.GET_BY_BOARD_ERROR, status, e);
  }
}

export async function createTaskController(c: Context) {
  const input = await c.req.json<CreateTaskInputType>();

  try {
    await validateCreateTaskInput(input);
    const response = await createTaskQuery(input);
    const status = HTTP_STATUS.CREATED;

    return apiResponse(c, response, TASKS.CREATED, status);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, TASKS.CREATED_ERROR, status, e);
  }
}

export async function changeTaskStatusController(c: Context) {
  const taskId = c.req.param("id");
  const input = await c.req.json<ChangeTaskStatusInputType>();

  try {
    await validateTaskIdInput(taskId);
    await validateChangeTaskStatusInput(input);
    const response = await changeTaskStatusQuery(taskId, input);
    const status = HTTP_STATUS.OK;

    return apiResponse(c, response, TASKS.UPDATED, status);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, TASKS.UPDATED_ERROR, status, e);
  }
}

export async function updateTaskController(c: Context) {
  const taskId = c.req.param("id");
  const input = await c.req.json<UpdateTaskInputType>();

  try {
    await validateTaskIdInput(taskId);
    await validateUpdateTaskInput(input);
    const response = await updateTaskQuery(taskId, input);
    const status = HTTP_STATUS.OK;

    return apiResponse(c, response, TASKS.UPDATED, status);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, TASKS.UPDATED_ERROR, status, e);
  }
}

export async function deleteTaskController(c: Context) {
  const taskId = c.req.param("id");

  try {
    await validateTaskIdInput(taskId);
    const response = await deleteTaskQuery(taskId);
    const status = HTTP_STATUS.OK;

    return apiResponse(c, response, TASKS.DELETED, status);
  } catch (e) {
    const status = getErrorStatus(e);

    return apiResponse(c, null, TASKS.DELETED_ERROR, status);
  }
}
