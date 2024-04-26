"use server";

import { auth } from "@clerk/nextjs/server";
import getHonoClient from "~/honoClient";

export const getTeams = async () => {
  const { getToken, userId } = auth();

  if (!userId) return { error: "You're not authorized!", data: null };

  try {
    const token = await getToken();
    const client = getHonoClient(token);
    const usersRes = await client.users.$get();
    const { data } = await usersRes.json();

    if (data === null) throw new Error("No data found");

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
};
