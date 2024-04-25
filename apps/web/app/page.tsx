import Container from "~/components/Container";
import UserList from "./_components/UserList";

export default async function Home() {
  return (
    <Container>
      <h1>Home Page</h1>

      <UserList />
    </Container>
  );
}
