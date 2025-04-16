import '../support/commands';
import en from '../../src/i18n/locales/en/translations.json';
import ru from '../../src/i18n/locales/ru/translations.json';
const deploymentUrl = 'http://localhost:3000';

describe('Team setup page tests', () => {
    const langs = ['en', 'ru'];
    const translations = { en, ru };
    const requiredKeys = ['game-settings', 'not-enough-teams-error'];

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
                cy.get('img[alt="Change language"]').click(); // todo
                cy.get(`img[src="/${lang}.svg"]`).click(); // todo
                cy.contains(`${t['game-settings']} 1 / 3`).should('be.visible');
            });

            it('should show team error when no team is present', () => {
                // when
                cy.getByCy("team-page-continue-btn").click();

                // then
                cy.contains(t['not-enough-teams-error']).should('be.visible');
            });

            it('should show team error and player error when 1 team with no players', () => {
                // given
                cy.getByCy('team-name-input').click().type('{enter}');

                // when
                cy.getByCy("team-page-continue-btn").click();

                // then
                cy.contains(`${t['game-settings']} 1 / 3`).should('be.visible');
                cy.contains(t['not-enough-teams-error']).should('be.visible');
                cy.contains(t['not-enough-players-error']).should('be.visible');
            })

            it('should show only player error when 2 team with no players', () => {
                // given
                cy.getByCy('team-name-input').click().type('{enter}');

                // when
                cy.getByCy("team-page-continue-btn").click();

                // then
                cy.contains(`${t['game-settings']} 1 / 3`).should('be.visible');
                cy.contains(t['not-enough-players-error']).should('be.visible');
            })

            it('should show tour setup page when 2 teams and 1 player per team', () => {
                // given
                cy.getByCy('team-name-input').click().type('{enter}');
                cy.getByCy('player-name-input').click().type('Test Player Name').type('{enter}');
                cy.getByCy('team-name-input').last().click().type('{enter}');
                cy.getByCy('player-name-input').last().click().type('Another Test Player').type('{enter}');

                // when
                cy.getByCy("team-page-continue-btn").click();

                // then
                cy.contains(`${t['game-settings']} 2 / 3`).should('be.visible');
            })
        });
    });
});
