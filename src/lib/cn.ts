/** Склеивает css-классы, пропуская пустые значения. */
export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
