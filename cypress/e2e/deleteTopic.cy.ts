/// <reference types="cypress" />

describe("Deleting Topics", () => {

  beforeEach(() => {
    cy.task("seedDatabase");
  });

  it("should encounter errors when missing form requirements", () => {
    cy.login();
    cy.visit("/javascript");
    cy.get('[data-testid="topiclist-edit-button"]').click();
    cy.wait(2000) // wait for animation to finish
    cy.get('[data-testid="entity-delete-button"]').click({ force: true });

    cy.get(".toast-notification").then(($toast) => {
      const text = $toast.text();
      expect(text).to.contain("Topic deleted successfully.");
    });
  })
})