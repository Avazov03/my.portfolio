"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  label: string;
  doneLabel: string;
};

export function CopyButton({ value, label, doneLabel }: CopyButtonProps) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
      className="rounded-lg border-[1.5px] border-ink/60 px-3 py-1.5 text-xs font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-black"
    >
      <span aria-live="polite">{done ? doneLabel : label}</span>
    </button>
  );
}
