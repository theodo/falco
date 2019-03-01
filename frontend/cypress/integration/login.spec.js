/// <reference types="Cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.server();
    cy.route({ method: 'POST', url: 'http://localhost:8000/auth/jwt/create' }).as('auth');
  });

  it('should display the authentication token if login is successfull', () => {
    cy.get("input[name='username']").type('jean_moust');
    cy.get("input[name='password']").type('lolilol');
    cy.get("button[type='submit']").click();
    cy.wait('@auth')
      .its('status')
      .should('be', 200);
    cy.get('pre')
      .invoke('text')
      .should(text => {
        expect(text).to.eq(localStorage.getItem('token'));
      });
  });

  it('should not display the authentication token if login is unsuccessfull', () => {
    cy.get("input[name='username']").type('some_random_dude');
    cy.get("input[name='password']").type('some_random_password');
    cy.get("button[type='submit']").click();
    cy.wait('@auth')
      .its('status')
      .should('be', 401);
  });

  it('should display an error message if no username is typed', () => {
    cy.get("button[type='submit']").click();
    cy.get('p')
      .invoke('text')
      .should(text => {
        expect(text).to.eq('Username required');
      });
  });
});
