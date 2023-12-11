function transformDataKey(key: string) {
  return key.startsWith("data-") ? key : `data-${key}`;
}

export function getDataProps(params: Record<string, any>) {
  if (!params) {
    return null;
  }

  return Object.keys(params).reduce(
    (acc, key) => {
      const value = params[key];

      if (
        value === undefined ||
        value === "" ||
        value === false ||
        value === null
      ) {
        return acc;
      }

      acc[transformDataKey(key)] = value;
      return acc;
    },
    {} as Record<string, any>
  );
}
