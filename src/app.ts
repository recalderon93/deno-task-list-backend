import "jsr:@std/dotenv/load";
import { Hono } from "hono";
import userRoutes from "./routes/users.routes.ts";
import taskRoutes from "./routes/tasks.routes.ts";
import boardRoutes from "./routes/boards.routes.ts";

const app = new Hono();

app.route("/users", userRoutes);
app.route("/boards", boardRoutes);
app.route("/tasks", taskRoutes);

export default app;
