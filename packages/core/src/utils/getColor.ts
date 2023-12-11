export function getColor(color: unknown): string | undefined {
  if (color === undefined) {
    return undefined;
  }

  switch (color as string) {
    case "neutral":
      return "hsl(var(--n))";
    case "primary":
      return "hsl(var(--p))";
    case "secondary":
      return "hsl(var(--s))";
    case "accent":
      return "hsl(var(--a))";
    case "info":
      return "hsl(var(--in))";
    case "success":
      return "hsl(var(--su))";
    case "warning":
      return "hsl(var(--wa))";
    case "error":
      return "hsl(var(--er))";
    default:
      return color as string;
  }
}
