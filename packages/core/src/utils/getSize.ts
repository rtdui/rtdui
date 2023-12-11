function isNumberLike(value: unknown) {
  if (typeof value === "number") {
    return true;
  }

  if (typeof value === "string") {
    if (
      value.startsWith("calc(") ||
      value.startsWith("var(") ||
      (value.includes(" ") && value.trim() !== "")
    ) {
      return true;
    }

    return /[0-9]/.test(value.trim().replace("-", "")[0]);
  }

  return false;
}

export function getSize(size: unknown, prefix = "size"): string | undefined {
  if (size === undefined) {
    return undefined;
  }

  return isNumberLike(size) ? (size as string) : `var(--${prefix}-${size})`;
}
