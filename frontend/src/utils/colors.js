/**
 * Color utilities
 */

export function scoreColor(score) {
  if (score >= 0.5) return "var(--green)";
  if (score >= 0.25) return "var(--teal)";
  if (score >= 0.10) return "var(--amber)";
  if (score >= 0) return "var(--rose)";
  return "var(--rose)";
}
