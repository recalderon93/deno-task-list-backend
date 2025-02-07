import { Context } from "hono";
import type {
  changeTaskStatusInputType,
  CreateTaskInputType,
  Task,
  UpdateTaskInputType,
} from "models/task.model.ts";

export function getTasksByBoardIdController(c: Context) {
  const boardId = c.req.param("boardId");

  try {
    // #TODO Validate Input
    return c.json({
      message: `Getting Tasks of BoardId=${boardId}`,
      data: [] as Task[],
    }, 200);
  } catch (e) {
    console.error(e);
    return c.json({
      message: `Error getting tasks of boardId=${boardId}`,
    }, 400);
  }
}

export async function createTaskController(c: Context) {
  const input = await c.req.json<CreateTaskInputType>();

  try {
    // #TODO validate Task's Input
    c.json({
      message: "Task Created.",
      data: { ...input } as Task,
    });
  } catch (e) {
    console.error(e);
    return c.json({
      message: `Error creating new Task`,
    }, 401);
  }
}

export async function changeTaskStatusController(c: Context) {
  const taskId = c.req.param("id");
  const input = await c.req.json<changeTaskStatusInputType>();

  try {
    // #TODO validate input
    c.json({
      message: `Change status input to ${input.status}`,
      data: {
        status: input.status,
      } as Task,
    });
  } catch (e) {
    console.error(e);

    return c.json({
      message: `Error changing status of task = ${taskId}`,
    }, 401);
  }
}

export async function updateTaskController(c: Context) {
  const taskId = c.req.param("id");
  const input = await c.req.json<UpdateTaskInputType>();

  try {
    // #TODO Validate Input
    return c.json({
      message: `Error updating task= ${taskId}`,
      data: {
        ...input,
      } as Task,
    });
  } catch (e) {
    console.error(e);

    return c.json({
      message: `Error updating task = ${taskId}`,
    }, 401);
  }
}

export function deleteTaskController(c: Context) {
  const taskId = c.req.param("id");

  try {
    // Validate Input
    return c.json({
      message: `Task deleted.`,
      data: {} as Task,
    }, 200);
  } catch (e) {
    console.error(e);

    return c.json({
      message: `Error updating task= ${taskId}`,
    }, 401);
  }
}
