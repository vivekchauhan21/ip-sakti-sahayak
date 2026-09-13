import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BoundingBox } from "@/types/database";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateSHA256Hash(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function parseCoordinates(coords: unknown): BoundingBox | null {
  if (!coords || typeof coords !== "object") return null;
  const c = coords as Record<string, unknown>;
  if (
    typeof c.x === "number" &&
    typeof c.y === "number" &&
    typeof c.width === "number" &&
    typeof c.height === "number"
  ) {
    return {
      x: c.x,
      y: c.y,
      width: c.width,
      height: c.height,
    };
  }
  return null;
}