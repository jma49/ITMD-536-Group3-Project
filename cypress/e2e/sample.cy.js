describe('Sample Test', () => {
    it('Visits the Cypress website', () => {
      cy.visit('https://example.cypress.io');
      cy.contains('type').click();
      cy.url().should('include', '/commands/actions');
    });
  });
  