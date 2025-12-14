import '../support/commands';
import en from '../../src/i18n/locales/en/translations.json';
import ru from '../../src/i18n/locales/ru/translations.json';
const deploymentUrl = 'http://localhost:3000';

// todo

describe('Tour setup page tests', () => {
  const langs = ['en', 'ru'];
  const translations = { en, ru };
  const requiredKeys = [
    'only-positive-allowed', 'round-duration-err', 'go-to-game',
    'game-settings', 'round-duration', 'show-score-during-game'
  ];

  langs.forEach((lang) => {
    const t = translations[lang];

    describe(`${lang} translations test`, () => {
      requiredKeys.forEach((key) => {
        it(`should have key '${key}' in ${lang}`, () => {
          cy.verifyTranslationKey(translations, lang, key);
        });
      });
    });

    it('should find all labels', () => {
      
    });

    it('should continue to game page with defaults', () => {

    });

    const invalidInputs = []
    invalidInputs.forEach((invalidInputValue) => {
      it(`should show round duration error when invalid input ${invalidInputValue}`, () => {

      });
    });

    it('should toggle', () => {

    });
  });
});
