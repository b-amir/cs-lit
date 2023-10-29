/// <reference types="cypress" />


describe("Categories", () => {

  it("should encounter an error when submitting without authorization", () => {
    cy.task("seedDatabase");
    cy.visit("/someCategory");

    // error path: non-admin user:
    cy.get('[data-testid="add-category-input"]').type("TypeScript");
    cy.get('[data-testid="add-category-submit"]').click();
    cy.get(".toast-notification").then(($toast) => {
      const text = $toast.text();
      expect(text).to.contain("Thanks for your suggestion!")
    });
  });


  it("should be able to create a category", () => {
    cy.task("seedDatabase");
    // Calling the custom cypress login command
    cy.login();
    cy.visit("/someCategory");

    // happy path:
    cy.get('[data-testid="add-category-input"]').type("TypeScript");
    cy.get('[data-testid="add-category-submit"]').click()
    cy.get(".toast-notification").then(($toast) => {
      const text = $toast.text();
      expect(text).to.contain("Category created successfully.");
    })
  })


  it("should encounter an error when submitting an existing category name", () => {
    cy.visit("/someCategory");

    // error path: admin user, but category already exists:
    cy.get('[data-testid="add-category-input"]').type("TypeScript");
    cy.get('[data-testid="add-category-submit"]').click();
    cy.get(".toast-notification").then(($toast) => {
      const text = $toast.text();
      expect(text).to.contain("A category with the same name already exists.")
    });
  });
});