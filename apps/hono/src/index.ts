import { serve } from "@hono/node-server";
import { Hono } from "hono";
import usersRoute from "./routes/users";
import todosRoute from "./routes/todos";

const app = new Hono();

const routes = app.route("/users", usersRoute).route("/todos", todosRoute);

export type AppType = typeof routes;

const port = 8787;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
