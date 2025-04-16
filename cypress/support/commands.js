Cypress.Commands.add('getByCy', (id) => {
  return cy.get(`[data-cy="${id}"]`);
});

Cypress.Commands.add('verifyTranslationKey', (translations, lang, key) => {
  expect(translations[lang][key], `'${key}' missing for language: ${lang}`).to.exist;
});