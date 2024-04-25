"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();

  return (
    <div className="w-full h-screen flex items-center justify-center text-center">
      <SignIn
        appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
        afterSignInUrl={"/"}
        path="/sign-in"
      />
    </div>
  );
}
