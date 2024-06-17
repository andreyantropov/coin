describe('API', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.get('#auth-login').type('developer');
    cy.get('#auth-password').type('skillbox');
    cy.get('.auth-form-submit').click();
  });

  it('Can authorize', () => {
    cy.url().should('eq', 'http://localhost:5500/#/');
  });

  it('Can see the list of accounts', () => {
    cy.get('.accounts__title').should('contain', 'Ваши счета');
    cy.get('.accounts__list').should('exist');
    cy.get('.accounts__list')
      .find('.accounts__item')
      .contains('74213041477477406320783754');
  });

  it('Can translate amount from account to account', () => {
    cy.get('.accounts__item')
      .contains('74213041477477406320783754')
      .parent()
      .find('.account__btn')
      .click();
    cy.get('#transaction-account').type('78810415847736171135741812');
    cy.get('#transaction-amount').type('1000');
    cy.get('.transaction-form-submit').click();
    cy.get('.toastify').contains('Успешно!');
  });

  it('Can create new account', () => {
    cy.get('.accounts__item').then(($items) => {
      const initialCount = $items.length;
      cy.get('.accounts__new-btn').click();
      cy.get('.accounts__item').then(($items) => {
        expect($items.length).to.equal(initialCount + 1);
      });
    });
  });
});
