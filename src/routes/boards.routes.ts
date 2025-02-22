import { Hono } from "hono";
import {
  changeBoardOwnershipController,
  createBoardController,
  deleteBoardController,
  getBoardByIdController,
  updateBoardTitleController,
} from "controllers/boards.controllers.ts";
import { getTasksByBoardIdController } from "controllers/tasks.controllers.ts";

const brandRoutes = new Hono()
  .get("/:id", getBoardByIdController)
  .post("/", createBoardController)
  .patch("/:id/name", updateBoardTitleController)
  .patch("/:id/ownership", changeBoardOwnershipController)
  .delete("/:id", deleteBoardController)
  .get("/:id/tasks", getTasksByBoardIdController);

export default brandRoutes;
