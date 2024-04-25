import { ReactNode } from "react";
import { cn } from "~/lib/utils";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("w-[90%] mx-auto", className)}>{children}</div>;
};

export default Container;
