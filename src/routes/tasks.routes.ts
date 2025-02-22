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
  .patch("/:id/status", changeTaskStatusController)
  .patch("/:id", updateTaskController)
  .delete("/:id", deleteTaskController)
  .get("/:boardId", getTasksByBoardIdController);

export default taskRoutes;
