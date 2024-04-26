import { Hono } from "hono";
import { db } from "../../db";
import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
  .get(
    "/:id",
    zValidator(
      "query",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const clerkClient = c.get("clerk");
      const id = c.req.valid("query").id;

      if (!auth?.userId) {
        return c.json({ data: null, error: "You are not logged in." }, 401);
      }

      const result = await db.query.users.findFirst({
        where: { id: id },
      });
      const user = await clerkClient.users.getUser(auth.userId);

      console.log("Authenticated user: ", user);

      return c.json({
        data: result,
        userId: auth.userId,
        message: "You are logged in!",
      });
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        clerkUserId: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const clerkClient = c.get("clerk");
      const { clerkUserId } = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ data: null, error: "You are not logged in!" }, 401);
      }

      try {
        const user = await clerkClient.users.getUser(clerkUserId);

        console.log("Authenticated user: ", user);
        return c.json({ data: user, error: null }, 201);
      } catch (error) {
        return c.json({ data: null, error }, 201);
      }
    }
  );

export default app;
