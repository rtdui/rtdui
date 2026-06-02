const pinyinCollator = new Intl.Collator("zh-Hans-CN", {
  sensitivity: "accent",
});

/** 拼音排序比较器 */
export function pinyinComparer(a: string, b: string) {
  return pinyinCollator.compare(a, b);
}
