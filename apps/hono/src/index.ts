import { serve } from "@hono/node-server";
import { Hono } from "hono";
import usersRoute from "./routes/users";
import todosRoute from "./routes/todos";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", clerkMiddleware());

app.use("*", cors());

app.get("/", (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  return c.json({
    message: "You are logged in!",
    userId: auth.userId,
  });
});

const routes = app.route("/users", usersRoute).route("/todos", todosRoute);

export type AppType = typeof routes;

const port = 8787;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
