import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Language URL utilities
export function createShareableURL(
  language: "en" | "ar",
  section?: string
): string {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("lang", language);
  if (section) {
    url.hash = `#${section}`;
  }
  return url.toString();
}

export function getLanguageFromURL(): "en" | "ar" | null {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang") as "en" | "ar";
  return langParam === "en" || langParam === "ar" ? langParam : null;
}
