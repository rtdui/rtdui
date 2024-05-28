/** 四舍五入到指定小数位数 */
export function round(number: number, digits = 0, base = 10 ** digits) {
  return Math.round(number * base) / base;
}
