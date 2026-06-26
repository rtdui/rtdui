import type { InitOptions } from "i18next";

export default {
  // This is the list of languages your application supports
  supportedLngs: ["en", "zh"],
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: "zh",
  ns: ["translation"],
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: "translation",
  // Disabling suspense is recommended
  react: { useSuspense: false },
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
} satisfies InitOptions;
