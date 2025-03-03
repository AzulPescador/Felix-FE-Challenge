import 'jest';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom/extend-expect';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/i18n/locales/en.json';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    debug: false,
    resources: {
      en: {
        translation: en,
      },
    },
  });
});
