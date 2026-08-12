type ClassValue = string | number | null | undefined | false;

export function cn(...inputs: ClassValue[]) {
  return inputs
    .filter((input) => input && typeof input === "string" && input.trim().length > 0)
    .join(" ");
}
