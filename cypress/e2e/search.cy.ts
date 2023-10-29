/// <reference types="cypress" />


describe("Search feature", () => {

  beforeEach(() => {
    cy.task("seedDatabase");
  });

  it("searching for a topic at landing page", () => {
    cy.visit("/");

    cy.get('[data-testid="home-search-button"]').click()
    cy.get('#counter-input').click().type("closure")

    // search results should include the word "closure", which is in the seed data
    cy.get('[data-testid="search-results"]').should(($results) => {
      const text = $results.text();
      Cypress.log({
        name: 'Search Results Text',
        message: text,
      });
      expect(text).to.match(/closure/i);
    }).as("theResult");

    // checking if clicking on a search result takes us to the topic page
    cy.get('@theResult').click()
    cy.location('pathname', { timeout: 12_000 }).should('include', '/closure');
  });

  it("searching for a topic inside the app", () => {
    cy.visit("/someCategory/someTopic");

    cy.get('[data-testid="search-bar-input"]').click().type("closure")

    // search results should include the word "closure", which is in the seed data
    cy.get('[data-testid="search-results"]').should(($results) => {
      const text = $results.text();
      Cypress.log({
        name: 'Search Results Text',
        message: text,
      });
      expect(text).to.match(/closure/i);
    }).as("theResult");

    // checking if clicking on a search result takes us to the topic page
    cy.get('@theResult').click()
    cy.location('pathname', { timeout: 12_000 }).should('include', '/closure');
  })

});