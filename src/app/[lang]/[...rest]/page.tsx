import { notFound } from "next/navigation";

// Exists only to throw notFound(), so there is no segment for instant validation to render.
export const instant = false;

export default function UnknownRoute() {
  notFound();
}
