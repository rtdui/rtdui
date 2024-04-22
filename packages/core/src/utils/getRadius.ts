export function getRadius(radius: unknown): string | undefined {
  if (radius === undefined) {
    return undefined;
  }

  switch (radius as string) {
    case "xs":
      return "calc(1rem / 8)"; // 默认情况下为:2px
    case "sm":
      return "calc(1rem /4)"; // 默认情况下为:4px
    case "md":
      return "calc(1rem / 2)"; // 默认情况下为:8px
    case "lg":
      return "1rem"; // 默认情况下为:16px
    case "xl":
      return "2rem"; // 默认情况下为:32px
    case "circle":
      return "9999rem";
    default:
      return radius as string;
  }
}
