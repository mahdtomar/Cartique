import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./../i18n/locales/en/translation.json";
import translationAR from "./../i18n/locales/ar/translation.json";
import storeAR from "./../i18n/locales/ar/store.json";
import storeEN from "./../i18n/locales/en/store.json";
import productPageAR from "@/i18n/locales/ar/productPage.json";
import productPageEN from "@/i18n/locales/en/productPage.json";
import cartAR from "@/i18n/locales/ar/cart.json";
import cartEN from "@/i18n/locales/en/cart.json";

const resources = {
  en: {
    common: translationEN,
    store: storeEN,
    productPage: productPageEN,
    cart: cartEN,
  },
  ar: {
    common: translationAR,
    store: storeAR,
    productPage: productPageAR,
    cart: cartAR,
  },
};

i18n
  .use(LanguageDetector) // detects user language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    defaultNS: "common",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
