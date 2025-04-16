const deploymentUrl = 'http://localhost:3000';

describe('Tour setup acceptance tests', () => {
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

  it('should select words from easy list', () => {
    // select easy option
    // continue
    // continue
    // open word
    // verify word from easy list
  });

  it('should select words from medium list', () => {
    // select medium option
    // continue
    // continue
    // open word
    // verify word from medium list
  });

  it('should select words from hard list', () => {
    // select hard option
    // continue
    // continue
    // open word
    // verify word from hard list
  });

  it('should toggle hide amount of left words and no left words visible', () => {
    // toggle hide
    // continue
    // continue
    // verify left words is hide
  });

  it('should toggle show amount of left words and left words should be visible', () => {
    // toggle show
    // continue
    // continue
    // verify left words is shown
  });
})