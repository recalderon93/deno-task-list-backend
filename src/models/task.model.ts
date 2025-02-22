export type TaskStatusType =
  | "todo"
  | "paused"
  | "in-progress"
  | "done";

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description?: string;
  status: TaskStatusType;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}