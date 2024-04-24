import { hc } from "hono/client";
import { AppType } from "api";

const client = hc<AppType>("http://localhost:8787");

export default async function Home() {
  const userRes = await client.users.$get();
  const users = await userRes.json();

  const todoRes = await client.todos.$get();
  const todos = await todoRes.json();

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
