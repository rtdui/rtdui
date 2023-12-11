export function getRadius(radius: unknown): string | undefined {
  if (radius === undefined) {
    return undefined;
  }

  switch (radius as string) {
    case "xs":
      return "calc(2 / 1rem)";
    case "sm":
      return "calc(4 / 1rem)";
    case "md":
      return "calc(8 / 1rem)";
    case "lg":
      return "calc(16 / 1rem)";
    case "xl":
      return "calc(24 / 1rem)";
    case "2xl":
      return "calc(32 / 1rem)";
    case "circle":
      return "9999rem";
    default:
      return radius as string;
  }
}
