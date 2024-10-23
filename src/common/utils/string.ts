export function captilize(text: string) {
  if (typeof text !== "string" || text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function validateTimeFormat(timeString: string): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(timeString);
}