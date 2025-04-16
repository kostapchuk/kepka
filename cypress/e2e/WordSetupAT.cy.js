const deploymentUrl = 'http://localhost:3000';

describe('Words setup acceptance test', () => {
  beforeEach(() => {
    cy.visit(deploymentUrl)
    cy.get('img[alt="Change language"]').click();
    cy.get('img[src="/ru.svg"]').click();

    cy.contains('Настройка игры 1 / 3').should('be.visible');
    cy.get('input[placeholder="Название команды"]').click().type('{enter}');
    cy.get('input[placeholder="Введите имя игрока"]').click().type(
        'Test Player Name').type('{enter}');
    cy.get('input[placeholder="Название команды"]').click().type('{enter}');
    cy.get('input[placeholder="Введите имя игрока"]').last().click().type(
        'Another Test Player').type('{enter}');

    cy.get('button').contains('Продолжить').click();

    cy.contains('Настройка игры 2 / 3').should('be.visible');
  })

  it('should input round duration', () => {
    // input duration
    // continue
    // verify round duration
  });

  it('should show score during game', () => {
    // toggle show score
    // continue
    // switch tab
    // verify shown score during game
  });

  it('should hide score during the game', () => {
    // toggle hide score
    // continue
    // switch tab
    // verify hidden score during game
  });
})