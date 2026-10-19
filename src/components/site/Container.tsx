import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className="lg:px-6">
      <div className={`mx-auto w-full max-w-[1380px] px-6 sm:px-10 lg:px-14 ${className}`}>{children}</div>
    </div>
  );
}
