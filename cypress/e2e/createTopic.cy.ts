/// <reference types="cypress" />

describe("Creating New Topics", () => {

  beforeEach(() => {
    cy.task("seedDatabase");
  });

  it("should encounter errors when missing form requirements", () => {
    cy.login();
    cy.visit("/javascript");

    // error path:
    cy.get('[data-testid="create-topic-button"]').click();
    cy.get('#title').type("s"); // error expected, title too short
    cy.get('#url').type("google"); // error expected, url invalid
    cy.get('#comment').type("scope description"); // error expected, description too short
    cy.get('#hasReference').click();
    cy.get('#reference').type("https://www.google.com");
    cy.get('[data-testid="submit-button"]').click();

    cy.get(".toast-notification").then(($toast) => {
      const text = $toast.text();
      expect(text).to.contain("Analogy must be at least 120 characters");
      expect(text).to.contain("Title is too short");
      expect(text).to.contain("Please provide a valid URL to docs");
    });
  })

  it("should be able to create a topic", () => {
    // happy path:
    cy.get('[data-testid="create-topic-button"]').click({ force: true });
    cy.get('[data-testid="editor-backdrop"]').click({ force: true });
    cy.get('[data-testid="create-topic-button"]').click({ force: true });

    cy.get('#title').clear().type("scope");
    cy.get('#url').clear().type("https://www.google.com");
    cy.get('#comment').clear().type("scope description that is at least 120 characters long and this time it should work because we provided a description that is long enough");

    cy.get('[data-testid="submit-button"]').click({ force: true });
    cy.get(".toast-notification").then(($toast) => {
      const text = $toast.text();
      expect(text).to.contain("Topic created successfully.");
    });
  })
})