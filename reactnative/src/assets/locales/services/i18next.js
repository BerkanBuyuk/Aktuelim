import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../en.json';
import tr from '../tr.json';

export const languageResources = {
  tr: {translation: tr},
  en: {translation: en},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLgn: 'en',
  resources: languageResources,
});

export default i18next;
