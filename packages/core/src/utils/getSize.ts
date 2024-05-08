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

export function getSpacing(size: unknown) {
  if (size === undefined) {
    return "var(--theme-spacing-size)";
  }
  return getSize(size, "theme-spacing-size");
}

export function getRadius(size: unknown) {
  if (size === undefined) {
    return "var(--theme-radius-size)";
  }

  return getSize(size, "theme-radius-size");
}

export function getFontSize(size: unknown) {
  if (size === undefined) {
    return "var(--theme-font-size)";
  }
  return getSize(size, "theme-font-size");
}

export function getLineHeight(size: unknown) {
  if (size === undefined) {
    return "var(--theme-line-height)";
  }
  return getSize(size, "theme-line-height");
}

export function getShadow(size: unknown) {
  if (!size) {
    return undefined;
  }

  return getSize(size, "theme-shadow");
}
