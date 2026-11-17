/**
 * Experience subtitles are stored as "Company · Team · City · Work mode".
 * Split them so the company can be emphasised separately from the details.
 */
export function splitSubtitle(subtitle?: string): { company: string; details: string[] } {
  const parts = (subtitle ?? "").split("·").map((part) => part.trim()).filter(Boolean);
  return { company: parts[0] ?? "", details: parts.slice(1) };
}

export const isCurrentRole = (timeframe?: string) => /present/i.test(timeframe ?? "");
