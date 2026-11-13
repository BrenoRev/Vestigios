import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-5xl px-5.5 md:px-12 lg:px-13 ${className}`}
    >
      {children}
    </div>
  );
}
