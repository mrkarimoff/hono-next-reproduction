import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import Container from "./Container";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const HeaderComponent = () => {
  const { userId } = auth();

  return (
    <div className="w-full h-20 border-b-2">
      <Container className="flex justify-between h-full items-center">
        <Link className="text-xl" href={"/"}>
          Next-Hono MVP
        </Link>
        <div className="flex items-center gap-3">
          <ModeToggle />
          {userId ? (
            <div className="text-blue-500 hover:text-blue-600 transition-colors">
              <SignOutButton />
            </div>
          ) : (
            <div className="text-blue-500 hover:text-blue-600 transition-colors">
              <SignInButton />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default HeaderComponent;
