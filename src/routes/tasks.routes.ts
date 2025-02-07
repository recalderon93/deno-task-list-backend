import { Hono } from "hono";
import {
  changeTaskStatusController,
  createTaskController,
  deleteTaskController,
  getTasksByBoardIdController,
  updateTaskController,
} from "controllers/tasks.controllers.ts";

const taskRoutes = new Hono()
  .post("/", createTaskController)
  .patch("/:id", changeTaskStatusController)
  .patch("/:id", updateTaskController)
  .delete("/:id", deleteTaskController);

taskRoutes.get("/:boardId", getTasksByBoardIdController);

export default taskRoutes;
