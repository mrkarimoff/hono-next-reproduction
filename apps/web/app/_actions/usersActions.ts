"use server";

import { auth } from "@clerk/nextjs/server";
import getHonoClient from "~/honoClient";

export const saveUser = async (clerkUserId: string) => {
  if (!clerkUserId) return { error: "You're not authorized!", data: null };

  try {
    const client = getHonoClient();
    const userRes = await client.users.$post({ json: { clerkUserId } });
    const { data } = await userRes.json();

    if (data === null) throw new Error("No data found");

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
};
