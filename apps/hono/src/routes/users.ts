import { Hono } from "hono";
import { db } from "../../db";
import { getAuth } from "@hono/clerk-auth";

const app = new Hono().get("/", async (c) => {
  const auth = getAuth(c);
  const clerkClient = c.get("clerk");

  if (!auth?.userId) {
    return c.json(
      {
        data: null,
        userId: null,
        message: "You are not logged in.",
      },
      401
    );
  }

  const result = await db.query.users.findMany();
  const user = await clerkClient.users.getUser(auth.userId);

  console.log("Authenticated user: ", user);

  return c.json({
    data: result,
    userId: auth.userId,
    message: "You are logged in!",
  });
});

export default app;
