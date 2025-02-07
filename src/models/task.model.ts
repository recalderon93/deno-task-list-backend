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

export type CreateTaskInputType = {
  boardId: string;
  title: string;
  description?: string;
  createdBy: string;
};

export type changeTaskStatusInputType = {
  status: TaskStatusType;
};

export type UpdateTaskInputType = {
  title: string;
  description?: string;
};
