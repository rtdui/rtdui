import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import httpBackend from "i18next-http-backend";
import i18nConfig from "./src/i18n/config";

async function hydrate() {
	await i18next
		.use(initReactI18next) // Tell i18next to use the react-i18next plugin
		.use(LanguageDetector) // Setup a client-side language detector
		.use(httpBackend) // Setup your backend
		.init({
			...i18nConfig, // spread the configuration
			// This function detects the namespaces your routes rendered while SSR use
			ns: ["translation"],
			backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
			detection: {
				// order and from where user language should be detected
				order: [
					"querystring",
					"cookie",
					"localStorage",
					"sessionStorage",
					"navigator",
					"htmlTag",
					"path",
					"subdomain",
				],
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

if (window.requestIdleCallback) {
	window.requestIdleCallback(hydrate);
} else {
	// Safari doesn't support requestIdleCallback
	// https://caniuse.com/requestidlecallback
	window.setTimeout(hydrate, 1);
}
