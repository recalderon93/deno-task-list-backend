import { Hono } from "hono";
import {
  changeBoardOwnershipController,
  createBoardController,
  deleteBoardController,
  getBoardByIdController,
  getBoardsByUserController,
  updateBoardTitleController,
} from "controllers/boards.controllers.ts";

const brandRoutes = new Hono()
  .get("/:id", getBoardByIdController)
  .get("/:userId", getBoardsByUserController)
  .post("/", createBoardController)
  .patch("/:id", updateBoardTitleController)
  .patch("/:id", changeBoardOwnershipController)
  .delete("/:id", deleteBoardController);

export default brandRoutes;
