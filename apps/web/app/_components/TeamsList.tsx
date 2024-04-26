import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import fetchUsers from "~/lib/fetchUsers";

const TeamsList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { getToken } = useAuth();

  return (
    <div>
      <Button
        onClick={async () => {
          const token = await getToken();

          fetchUsers(token).then((res) => {
            if (res.error !== null) {
              console.error(res.error);
            } else {
              setUsers(res.data ?? []);
            }
          });
        }}
      >
        Get Users
      </Button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsList;
