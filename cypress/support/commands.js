// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add("addContact", () => {
  cy.contains("ADD NEW")
    .click()
    .get("#name-input")
    .type("Test")
    .get("#email-input")
    .type("test@test.com")
    .get("#birthday-input")
    .type("01/01/2010")
    .get("#cep-input")
    .type("01001000")
    .get("#number-input")
    .type("1")
    .get("button[type=submit]")
    .click();
});
