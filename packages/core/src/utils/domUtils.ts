import ms from "ms";

//#region 杂项
/**
 * 测试元素的内容是否已溢出, 包括文本内容超出或已显示了ellipsis
 * @param element Dom Element
 */
export function isOverflown(element: Element, aspect = "width") {
  if (aspect === "width") {
    return element.scrollWidth > element.clientWidth;
  }
  if (aspect === "height") {
    return element.scrollHeight > element.clientHeight;
  }
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

/**
 * 检测是否是iOS系统
 *
 * iOS is hosted on high-end devices. We can enable the backdrop transition without
 * dropping frames. The performance will be good enough.
 *
 * So: \<SwipeableDrawer disableBackdropTransition={false} /\>
 */
export function iOS() {
  window && /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * 检测是否是手机端
 * @returns
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}

/**
 * 类型数组转换为十六进制表示的字符串(一个字节固定2个字符)
 * @param buffer
 * @returns {string}
 */
export function bufferToHex(buffer: ArrayBuffer | Uint8Array) {
  let thing = buffer;
  if (buffer instanceof ArrayBuffer) {
    thing = new Uint8Array(buffer);
  }
  if (thing instanceof Uint8Array) {
    return Array.from(thing)
      .map((e) => `00${e.toString(16)}`.slice(-2))
      .join("");
  }
  return "";
}

/**
 * 十六进制表示的字符串转换为Uint8Array
 * @param hex 十六进制表示的字符串(一个字节固定2个字符)
 */
export function hexToBuffer(hex: string) {
  // 十六进制转Uint8Array
  const matchs = hex.match(/[\da-f]{2}/gi);
  if (matchs === null) {
    return null;
  }
  return new Uint8Array(matchs.map((h) => parseInt(h, 16)));
}

/**
 * 计算字符串表示的公式, str参数为字符串表示的合法的js表达式, 注意防止脚本注入攻击
 * @param {string} str
 */
export function calculate(str: string) {
  // 不直接写return new Function(`return ${str}`)();是阻止eslint检查出现警告
  const Fn = Function;
  return new Fn(`return ${str}`)();
}

//#endregion 杂项

//#region 剪贴板操作
/**
 * 获取剪贴板上面的字符串
 */
export async function getClipboardText() {
  return navigator.clipboard.readText();
}

/**
 * 解析剪贴板
 */
export function parseClipboardText(clipboardText: string) {
  // 去除\r字符,这是为了跨操作系统平台兼容.
  const normalText = clipboardText.replace(/\r/g, "");
  // 得到行的数组
  const rows = normalText.split(/\n/);
  // 去除最后一行的空行
  if (rows[rows.length - 1] === "") {
    rows.pop();
  }
  // 最终转换为行列的矩阵(二维数组)
  const matrix = rows.map((r) => r.split(/\t/));
  return matrix;
}

/**
 * 获取剪切板上面的内容得到一个键值对
 * 键:数据类型
 * 值:复制上来的值
 * 这边会得到的数据类型比较多  可能包含字符串 图片  html等等
 * @returns 键值对 键是复制的数据类型 值是复制的内容
 */
export async function getClipboardContents() {
  try {
    const contents: Record<string, any> = {};
    //  const result =  navigator.clipboard.readText();
    //获取剪切板的项
    const clipboardItems = await navigator.clipboard.read();
    for (const clipboardItem of clipboardItems) {
      //  复制的时候会得到不一样的类型  text/plain text/html
      //  text/ref image/png 下面需要根据不一样的类型进行转换 不一样
      //  的类型输出的结果值不一样
      for (const type of clipboardItem.types) {
        // 得到二进制串和类型
        // eslint-disable-next-line no-await-in-loop
        const blob = await clipboardItem.getType(type);
        // eslint-disable-next-line no-await-in-loop
        contents[type] = await blob.text();
      }
    }
    return contents;
  } catch (err) {
    const error = err as any;
    // eslint-disable-next-line no-console
    console.error(error.name, error.message);
    return null;
  }
}
//#endregion 剪贴板操作

//#region dom操作
/**
 * 元素移除一个或多个class
 */
export function removeClass(el: Element, ...classNames: string[]) {
  el.classList.remove(...classNames);
}

/**
 * 元素添加一个或多个class
 */
export function addClass(el: Element, ...classNames: string[]) {
  el.classList.add(...classNames);
}

/**
 * 元素是否有指定的class
 */
export function hasClass(el: Element, className: string) {
  el.classList.contains(className);
}

/**
 * 元素切换class
 */
export function toggleClass(el: Element, className: string) {
  el.classList.toggle(className);
}

/**
 * 元素用新的class替换存在的class
 */
export function replaceClass(
  el: Element,
  oldClassName: string,
  newClassName: string
) {
  el.classList.replace(oldClassName, newClassName);
}

/**
 * 测试元素是否匹配选择器
 */
export function matchesSelector(el: Element, selector: string) {
  return el.matches(selector);
}

/**
 * 得到DOM节点所关联的document对象
 */
export function ownerDocument(node: Node | null | undefined): Document {
  return (node && node.ownerDocument) || document;
}

/**
 * 得到DOM节点所关联的window对象
 */
export function ownerWindow(node: Node | undefined): Window {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
//#endregion dom操作

//#region 带有效期的 localStorage 操作
/**
 * localStorage中删除指定键的项,同时删除关于其过期的配对项
 */
export function removeStorage(key: string) {
  localStorage.removeItem(key);
  localStorage.removeItem(`${key}_expiresAt`);
}

/**
 * 从localStorage获取用上次调用setStorage()设置的key的值.
 *
 * 已过期的值会被删除, 并返回 null
 * @param key localStorage key
 * @returns 成功则返回存储的键值, 失败或过期返回 null
 */
export function getStorage(key: string) {
  // set expiration for storage
  let expiresAt = Number(localStorage.getItem(`${key}_expiresAt`)); // null 会被转为0
  if (Number.isNaN(expiresAt)) {
    expiresAt = 0;
  }
  const now = Date.now(); //epoch time, lets deal only with integer
  if (expiresAt < now) {
    // Expired
    removeStorage(key);
    return null;
  }
  return localStorage.getItem(key);
}

/**
 * 在localStorage上存储键值, 同时设置过期时间
 * @param expiresIn 有效期, 由vercel/ms库支持时间字符串,默认为 1 天.
 * @see https://github.com/vercel/ms/blob/master/src/index.ts
 */
export function setStorage(key: string, value: string, expiresIn = "1 days") {
  const expiresAt = Date.now() + ms(expiresIn); // 过期时间点
  localStorage.setItem(key, value);
  localStorage.setItem(`${key}_expiresAt`, expiresAt.toString());
}
//#endregion 带有效期的 localStorage 操作

/**
 * 当前的浏览器标签页是否显示中
 * @returns
 */
export function isBrowserTabVisible() {
  return document.visibilityState === "visible";
}

/**
 * url 的查询参数转对象
 * @param params
 */
export function urlSearchParamsToObject(url: string) {
  // 创建一个URLSearchParams实例
  let searchParams;
  if (url[0] === "?") {
    searchParams = new URLSearchParams(url); // ?开头时?符会被忽略.
  } else {
    searchParams = new URL(url).searchParams;
  }
  // 把键值对列表转换为一个对象
  const obj = Object.fromEntries(searchParams.entries());
  return obj;
}

/**
 * 长按事件处理器
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function longtap(handler: Function, options?: { threshold: number }) {
  const cancelEvents = ["pointermove", "pointerup", "pointercancel"];
  const defaultThreshold = 500;
  const threshold = options?.threshold ?? defaultThreshold;

  function listener(this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    function done() {
      handler.apply(context, args);
      listener.timeout = 0;
    }

    function cleanUp() {
      window.clearTimeout(listener.timeout);
      listener.timeout = 0;
      cancelEvents.forEach((name) =>
        document.removeEventListener(name, cleanUp)
      );
    }
    if (listener.timeout) return cleanUp();
    // if (!ev.touches || ev.touches.length > 1) return;

    listener.timeout = window.setTimeout(done, threshold);

    cancelEvents.forEach((name) => document.addEventListener(name, cleanUp));
    return null;
  }

  listener.handler = handler;
  listener.timeout = 0;
  return listener;
}
