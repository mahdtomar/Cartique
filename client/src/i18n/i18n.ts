import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./../i18n/locales/en/translation.json";
import translationAR from "./../i18n/locales/ar/translation.json";

const resources = {
    en: {
        translation: translationEN,
    },
    ar: {
        translation: translationAR,
    },
};

i18n.use(LanguageDetector) // detects user language
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
