/// <reference types="cypress" />



describe("Cypress login", () => {

  beforeEach(() => {
    cy.task("seedDatabase");
  });

  it("should provide a valid session", () => {
    // Calling the custom cypress login command
    cy.login();

  });
});
