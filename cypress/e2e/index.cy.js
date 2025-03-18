const deploymentUrl = 'http://localhost:3000';

describe('Team setup page tests', () => {
    beforeEach(() => {
        cy.visit(deploymentUrl)
    })

    it('verify 2 errors when no teams and no players present', () => {
        cy.contains('Настройка игры 1 / 3').should('be.visible');
        cy.get('button').contains('Продолжить').click();

        cy.contains('Нужны минимум 2 команды, чтобы начать игру').should('be.visible');
    })

    it('verify less than 2 teams error', () => {
        cy.contains('Настройка игры 1 / 3').should('be.visible');
        cy.get('input[placeholder="Название команды"]').click().type('{enter}');

        cy.get('button').contains('Продолжить').click();

        cy.contains('Нужны минимум 2 команды, чтобы начать игру').should('be.visible');
        cy.contains('Нужен минимум 1 игрок в каждой команде').should('be.visible');
    })

    it('verify less than 1 player in team error only', () => {
        cy.contains('Настройка игры 1 / 3').should('be.visible');
        cy.get('input[placeholder="Название команды"]').click().type('{enter}');
        cy.get('input[placeholder="Название команды"]').click().type('{enter}');

        cy.get('button').contains('Продолжить').click();

        cy.contains('Нужен минимум 1 игрок в каждой команде').should('be.visible');
    })

    it('verify valid input', () => {
        cy.contains('Настройка игры 1 / 3').should('be.visible');
        cy.get('input[placeholder="Название команды"]').click().type('{enter}');
        cy.get('input[placeholder="Введите имя игрока"]').click().type('Your text here').type('{enter}');
        cy.get('input[placeholder="Название команды"]').click().type('{enter}');
        cy.get('input[placeholder="Введите имя игрока"]').last().click().type('Your text here').type('{enter}');

        cy.get('button').contains('Продолжить').click();

        cy.contains('Настройка игры 2 / 3').should('be.visible');
    })
})
