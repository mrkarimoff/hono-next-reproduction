import getHonoClient from "~/honoClient";

async function fetchUsers(token: string | null) {
  const client = getHonoClient(token);

  try {
    const usersRes = await client.users.$get();
    const { data } = await usersRes.json();

    if (data === null) throw new Error("No data found");

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

export default fetchUsers;
