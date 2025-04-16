import '../support/commands';
import en from '../../src/i18n/locales/en/translations.json';
import ru from '../../src/i18n/locales/ru/translations.json';
import {DIFFICULTY_LEVELS} from "../../src/types/difficultyLevels";
const deploymentUrl = 'http://localhost:3000';

describe('Words setup page tests', () => {
  const langs = ['en', 'ru'];
  const translations = { en, ru };
  const requiredKeys = [
    'words-count-per-round', 'continue', 'game-settings',
    'words-in-game', 'words-difficulty', 'show-left-words',
      ...(DIFFICULTY_LEVELS.map(it => it.label))
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

    describe(`[${lang}]`, () => {
      beforeEach(() => {
        cy.visit(deploymentUrl);
        cy.getByCy("change-language-modal-open-button").click();
        cy.getByCy(`change-language-icon-${lang}`).click();
        // go to tour setup page
        cy.getByCy('team-name-input').type('{enter}');
        cy.getByCy('player-name-input').type('Test Player Name{enter}');
        cy.getByCy('team-name-input').last().type('{enter}');
        cy.getByCy('player-name-input').last().type('Another Test Player{enter}');
        cy.getByCy("team-page-continue-btn").click();
        cy.contains(`${t['game-settings']} 2 / 3`).should('be.visible');
      });

      it('should show all labels', () => {
        cy.contains(t['words-in-game']).should('be.visible');
        cy.contains(t['words-difficulty']).should('be.visible');
        cy.contains(t['show-left-words']).should('be.visible');
      })

      it('should go to next page with defaults', () => {
        // when
        cy.getByCy("words-page-continue-btn").click();

        // then
        cy.contains(`${t['game-settings']} 3 / 3`).should('be.visible');
      })

      const invalidInputs = [0, -1, 101, 999, '  ', 'abc'];
      invalidInputs.forEach((invalidInputValue) => {
        it(`should show words in game error when invalid input ${invalidInputValue}`, () => {
          // given
          cy.getByCy('round-duration-input').type(invalidInputValue);

          // when
          cy.getByCy("words-page-continue-btn").click();

          // then
          cy.contains(t['words-count-per-round']).should('be.visible');
        });
      })

      DIFFICULTY_LEVELS.forEach(difficulty => {
        it(`should select option ${t[difficulty.label]} and go to next page`, () => {
          // given
          cy.getByCy("difficulty-dropdown").click();
          cy.getByCy(`difficulty-item-${difficulty.value}`).click()

          // when
          cy.getByCy("words-page-continue-btn").click();

          // then
          cy.contains(`${t['game-settings']} 3 / 3`).should('be.visible');
        })
      });

      it('should untoggle and go to next page', () => {
        // given
        cy.getByCy("show-remaining-words-toggler").click();

        // when
        cy.getByCy("words-page-continue-btn").click();

        // then
        cy.contains(`${t['game-settings']} 3 / 3`).should('be.visible');
      })
    });
  });
});
