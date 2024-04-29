import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './en.json'
import translationAR from './ar.json'
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
.use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    lng: "ar", 

    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;