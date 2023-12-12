// import Backend from "i18next-fs-backend";
// import { resolve } from "node:path";
import { RemixI18Next } from "remix-i18next";
import i18n from "./i18n";

import enCommon from "../../public/locales/en/translation.json";
import zhCommon from "../../public/locales/zh/translation.json";

/** 由于cloudflare不是nodejs运行时,因此不支持fs后端, 使用内存资源作为后端替代 */
const langResource = {
  en: {
    translation: enCommon,
  },
  zh: {
    translation: zhCommon,
  },
};

/** 可在Remix的loader或action中使用 */
const remixI18Next = new RemixI18Next({
  // 用于对remix请求的语言侦测
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
    resources: langResource,
    // backend: {
    //   loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
    // },
  },
  // The i18next plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
  // E.g. The Backend plugin for loading translations from the file system
  // Tip: You could pass `resources` to the `i18next` configuration and avoid a backend here
  // plugins: [Backend],
});

export default remixI18Next;
