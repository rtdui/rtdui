export function getRadius(radius: unknown): string | undefined {
  if (radius === undefined) {
    return undefined;
  }

  switch (radius as string) {
    case "xs":
      return "calc(1rem / 8)";
    case "sm":
      return "calc(1rem /4)";
    case "md":
      return "calc(1rem / 2)";
    case "lg":
      return "1rem";
    case "circle":
      return "9999rem";
    default:
      return radius as string;
  }
}
