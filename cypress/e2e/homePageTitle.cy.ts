describe('Homepage Tests', () => {
    it('should load the homepage and display the title', () => {
      cy.visit('/');
      cy.title().should('eq', 'Create Next App');
    });
  
  });
  