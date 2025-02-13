import { Hono } from "hono";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  updateUserController,
} from "controllers/users.controllers.ts";

const userRoutes = new Hono()
  .get("/:id", getUserByIdController)
  .post("/", createUserController)
  .patch("/:id", updateUserController)
  .delete("/:id", deleteUserController);

export default userRoutes;
