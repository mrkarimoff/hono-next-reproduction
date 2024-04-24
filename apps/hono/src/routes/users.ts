import { Hono } from "hono";
import { db } from "../../db";

const app = new Hono().get("/", async (c) => {
  const result = await db.query.users.findMany();

  return c.json(result);
});

export default app;
