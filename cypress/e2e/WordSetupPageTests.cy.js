const deploymentUrl = 'http://localhost:3000';

// todo
describe('Tour setup page tests', () => {
    beforeEach(() => {
        cy.visit(deploymentUrl)
        cy.get('img[alt="Change language"]').click();
        cy.get('img[src="/ru.svg"]').click();

        cy.contains('Настройка игры 1 / 3').should('be.visible');
        cy.get('input[placeholder="Название команды"]').click().type('{enter}');
        cy.get('input[placeholder="Введите имя игрока"]').click().type('Test Player Name').type('{enter}');
        cy.get('input[placeholder="Название команды"]').click().type('{enter}');
        cy.get('input[placeholder="Введите имя игрока"]').last().click().type('Another Test Player').type('{enter}');

        cy.get('button').contains('Продолжить').click();

        cy.contains('Настройка игры 2 / 3').should('be.visible');
    })
    //
    // describe('Input tests', () => {
    //     const invalidInputs = [0, -1, 101, 999, '  ', 'abc'];
    //     invalidInputs.forEach((value) => {
    //         it(`should show error for invalid input: "${value}"`, () => {
    //             cy.get('input[type="tel"]').clear().type(`${value}`).type('{enter}');
    //             cy.get('button').contains('Продолжить').click();
    //
    //             cy.contains('Количество слов должно быть от 1 до 100').should('be.visible');
    //         });
    //     });
    //
    //     it(`should show next page with default value`, () => {
    //         cy.get('button').contains('Продолжить').click();
    //
    //         cy.contains('Настройка игры 3 / 3').should('be.visible');
    //     });
    //
    //     it(`should show next page with type value`, () => {
    //         cy.get('input[type="tel"]').clear().type(Math.floor(Math.random() * 100) + 1).type('{enter}');
    //         cy.get('button').contains('Продолжить').click();
    //
    //         cy.contains('Настройка игры 3 / 3').should('be.visible');
    //     });
    // })

    describe('Words difficulty selection tests', () => {
        const options = [
            { value: 'easy', label: 'Низкая' },
            { value: 'medium', label: 'Средняя' },
            { value: 'hard', label: 'Сложная' }
        ];

        it('should select any option', () => {
            // cy.contains('Сложность слов');
            //
            // options.forEach(opt => {
            //     cy.contains(opt.label.split('.')[1], { matchCase: false }).should('be.visible');
            // });
        });

        it('should toggle', () => {
            cy.contains('Показывать количество оставшихся слов');


        });
    })
})
