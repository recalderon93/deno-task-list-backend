import { Context, Hono } from "hono";
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
  .delete("/:id", deleteUserController)
  .get(
    "/",
    (c: Context) => c.json({ message: "Hello from usersssss" }, 200),
  );
export default userRoutes;
