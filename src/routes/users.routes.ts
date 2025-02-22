import { Hono } from "hono";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  updateUserController,
} from "controllers/users.controllers.ts";
import { getBoardsByUserController } from "controllers/boards.controllers.ts";

const userRoutes = new Hono()
  .get("/:id", getUserByIdController)
  .post("/", createUserController)
  .patch("/:id", updateUserController)
  .delete("/:id", deleteUserController)
  /** Get all Boards associated to an Users */
  .get("/:id/boards", getBoardsByUserController);

export default userRoutes;
