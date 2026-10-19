import type { ReactNode } from "react";

type StageProps = {
  children: ReactNode;
  className?: string;
};

export function Stage({ children, className = "" }: StageProps) {
  return (
    <div className="lg:p-6">
      <div
        className={`stage-light relative mx-auto flex w-full max-w-[1380px] flex-col overflow-hidden lg:rounded-[18px] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
