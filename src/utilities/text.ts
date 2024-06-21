
export function stripQuotes(text: string): string {
  return text.replace(/['|"]/g, '');
}
