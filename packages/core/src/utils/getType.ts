/**
 * 得到对象类型字符串表示, 能够区分数组, 对象 和 null.
 *
 * @returns 可能的值: 'String' | 'Boolean' | 'Number' | 'BigInt' | 'Symbol' | 'Undefined' | 'Null' | 'Array' |  'Object'(纯对象) | 'Function' | 'Date' 以及所有的类名
 */
export function getType(input: unknown) {
  return Object.prototype.toString.call(input).slice(8, -1);
}

export function isPrimitiveType(input: unknown) {
  const type = getType(input);
  switch (type) {
    case "String":
    case "Number":
    case "BigInt":
    case "Boolean":
    case "Null":
    case "Undefined":
    case "symbol":
      return true;
    default:
      return false;
  }
}
