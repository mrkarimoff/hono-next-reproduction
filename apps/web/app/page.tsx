import { hc } from "hono/client";
import { AppType } from "api";

const client = hc<AppType>("http://localhost:8787");

export default async function Home() {
  const userRes = await client.index.$get();
  const users = await userRes.json();

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
