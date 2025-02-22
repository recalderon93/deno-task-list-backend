import { z } from "zod";
import { customValidator } from "utils/customValidator.ts";

const createTaskInputSchema = z.object({
  boardId: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  createdBy: z.string().uuid(),
});

export type CreateTaskInputType = z.infer<typeof createTaskInputSchema>;

export const validateCreateTaskInput = (value: CreateTaskInputType) =>
  customValidator(createTaskInputSchema, value);

const taskStatusSchema = z.enum(["todo", "paused", "in-progress", "done"]);

const changeTaskStatusInputSchema = z.object({
  status: taskStatusSchema,
});

export type ChangeTaskStatusInputType = z.infer<
  typeof changeTaskStatusInputSchema
>;

export type TaskStatusType = z.infer<typeof taskStatusSchema>;

export const validateChangeTaskStatusInput = (
  input: ChangeTaskStatusInputType,
) => customValidator(changeTaskStatusInputSchema, input);

const updateTaskInputSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateTaskInputType = z.infer<typeof updateTaskInputSchema>;

export const validateUpdateTaskInput = (
  input: UpdateTaskInputType,
) => customValidator(updateTaskInputSchema, input);

const taskIdInputSchema = z.string().uuid();

export type TaskIdInputType = z.infer<typeof taskIdInputSchema>;

export const validateTaskIdInput = (input: TaskIdInputType) =>
  customValidator(taskIdInputSchema, input);

const taskUserIdInputSchema = z.string().uuid();

export type TaskUserIdInputType = z.infer<typeof taskUserIdInputSchema>;

export const validateTaskUserIdInput = (input: TaskUserIdInputType) =>
  customValidator(taskUserIdInputSchema, input);

const taskBoardIdInputSchema = z.string().uuid();

export type TaskBoardIdInputType = z.infer<typeof taskBoardIdInputSchema>;

export const validateTaskBoardIdInput = (input: TaskBoardIdInputType) =>
  customValidator(taskBoardIdInputSchema, input);
