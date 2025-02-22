import {
  ChangeTaskStatusInputType,
  CreateTaskInputType,
  TaskBoardIdInputType,
  TaskIdInputType,
  UpdateTaskInputType,
} from "validations/task.validations.ts";
import sql from "./client.ts";

export function createTaskQuery(input: CreateTaskInputType) {
  const { boardId, createdBy, ...args } = input;
  const parsedInput = {
    ...args,
    board_id: boardId,
    created_by: createdBy,
  };

  return sql`
    INSERT INTO tasks ${sql(parsedInput)}
    RETURNING *;
  `;
}

export function changeTaskStatusQuery(
  taskId: TaskIdInputType,
  input: ChangeTaskStatusInputType,
) {
  return sql`
    UPDATE tasks
    SET ${sql(input)}
    WHERE id = ${taskId}
    RETURNING *;
  `;
}

export function updateTaskQuery(
  taskId: TaskIdInputType,
  input: UpdateTaskInputType,
) {
  return sql`
    UPDATE tasks
    SET ${sql(input)}
    WHERE id = ${taskId}
    RETURNING *;
  `;
}

export function deleteTaskQuery(taskId: TaskIdInputType) {
  return sql`
    DELETE FROM tasks
    WHERE id = ${taskId}
    RETURNING *;
  `;
}

export function getTasksByBoardIdQuery(boardId: TaskBoardIdInputType) {
  return sql`
    SELECT * FROM tasks
    WHERE board_id = ${boardId}
  `;
}

export function getTaskByIdQuery(taskId: TaskIdInputType) {
  return sql`
    SELECT * FROM tasks
    WHERE id = ${taskId}
  `;
}
