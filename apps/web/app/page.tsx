import { auth } from "@clerk/nextjs/server";
import Container from "~/components/Container";

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    console.log("User is logged in.");
  }

  return (
    <Container>
      <h1>Home Page</h1>

      {userId ? <h1>You are logged in.</h1> : <h1>You are not logged in.</h1>}
    </Container>
  );
}
