import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { db } from "../db";

const app = new Hono().get("/", async (c) => {
  const result = await db.query.users.findMany();

  return c.json(result);
});

export type AppType = typeof app;

const port = 8787;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
