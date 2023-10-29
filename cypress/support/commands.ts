/// <reference types="cypress" />
import { authOptions } from "@/server/auth";


// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      // examples:
      // login(email: string, password: string): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      login(): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

// Cypress.Commands.add("login", () => {

//   const baseUrl = Cypress.config().baseUrl;
//   const testEmail = Cypress.env("EMAIL");
//   const testToken = Cypress.env("TEST_TOKEN");

//   cy.visit("/auth/login");
//   cy.get('[data-testid="login-email-input"]').type(testEmail).type("{enter}");

//   // user should be redirected to /auth/verify-request with this message:
//   cy.get('[data-testid="verify-req"').should("contain", "A sign in link has been sent to your email address.");

//   // then visit the link in the email. here's a mock link for testing env:
//   cy.visit(`/api/auth/callback/email?callbackUrl=${baseUrl}/someCategory&token=${testToken}&email=${testEmail}`);

//   // user should be redirected to /
//   cy.get('[data-testid="user-section-username"]').should("be.visible").then(() => {
//     cy.log("Login successful");
//   });
// });


Cypress.Commands.add("logout", () => {

  // cy.getCookies().should('have.length', 2)
  cy.clearCookie("next-auth.session-token");
  cy.clearCookie("__Secure-next-auth.session-token");
  cy.clearCookie("next-auth.csrf-token");
  // end cypress session:
  cy.clearCookies()
  cy.getCookies().should('be.empty')

  // cy.clearLocalStorage()
  cy.reload()
  // cy.get('[data-testid="user-section-logout"]', { timeout: 10_000 }).click();
  // cy.get('[data-testid="user-section-login"]').should("be.visible").then(() => {
  //   cy.log("Logout successful");
  // });


})



// --- Alternative login method using fake cookies: --- //
// ---------------------------------------------------- //

Cypress.Commands.add("login", () => {
  cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session");

  // https://github.com/nextauthjs/next-auth/discussions/2053#discussioncomment-1191016
  // Set the cookie for cypress.
  // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
  // We need to refresh this cookie once in a while.
  cy.setCookie("next-auth.session-token", Cypress.env("SESSION_TOKEN"));
  cy.setCookie(
    "__Secure-next-auth.session-token",
    Cypress.env("SESSION_TOKEN"),
    { secure: true }
  );

  cy.session("next-auth.session-token", () => {
    cy.visit("/");
    cy.wait("@session"); // wait for interception to complete
    cy.get('[data-testid="user-section-username"]').should("be.visible").then(() => {
      cy.log("Login successful");
    });
  });
});

