import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import httpBackend from "i18next-http-backend";
import i18nConfig from "./src/i18n/config";

async function main() {
  await i18next
    .use(initReactI18next) // Tell i18next to use the react-i18next plugin
    .use(languageDetector) // Setup a client-side language detector
    .use(httpBackend) // Setup your backend
    .init({
      ...i18nConfig, // spread the configuration
      backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
      detection: {
        /*
         * order and from where user language should be detected by default order
         *   querystring (append ?lng=LANGUAGE to URL)
         *   hash (append #lng=LANGUAGE or #/LANGUAGE to URL)
         *   cookie (set cookie i18next=LANGUAGE)
         *   localStorage (set key i18nextLng=LANGUAGE)
         *   sessionStorage (set key i18nextLng=LANGUAGE)
         *   navigator (set browser language)
         *   htmlTag (add html language tag <html lang="LANGUAGE" ...)
         *   path (http://my.site.com/LANGUAGE/...)
         *   subdomain (http://LANGUAGE.site.com/...)
         */
        // order: ['querystring', 'hash', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        convertDetectedLanguage: (lng) => lng.split("-")[0],
      },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>,
    );
  });
}

main().catch((error) => console.error(error));
