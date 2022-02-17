describe('WelcomeControllerShould', () => {
  it('Check if the web app is working', () => {
    cy.visit('http://localhost:8081/');
    cy.get('h1').should('have.text', 'Welcome to Application Web App');
  });
});
