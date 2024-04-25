import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center text-center">
      <SignIn path="/sign-in" />
    </div>
  );
}
