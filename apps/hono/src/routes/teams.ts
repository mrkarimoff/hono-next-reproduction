import { Hono } from "hono";
import { db } from "../../db";
import { getAuth } from "@hono/clerk-auth";

const app = new Hono().get("/", async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json(
      {
        data: null,
        message: "You are not logged in!",
      },
      401
    );
  }

  try {
    const result = await db.query.users.findMany();

    return c.json({
      data: result,
      message: "You are logged in!",
    });
  } catch (error) {}
});

export default app;
