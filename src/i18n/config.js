import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ru',
        resources: {
            ru: {
                translations: require('./locales/ru/translations.json')
            },
            en: {
                translations: require('./locales/en/translations.json')
            }
        },
        ns: ['translations'],
        defaultNS: 'translations',
        interpolation: {
            escapeValue: false
        }
    });

i18n.languages = ['ru', 'en'];

export default i18n;
