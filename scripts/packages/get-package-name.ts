/** 通过目录名或包名得到包名 */
export function getPackageName(input: string) {
  if (input.startsWith("@")) {
    return input;
  }

  return `@rtdui/${input}`;
}
