describe("Homepage tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact();
  });
  
  it("renders the Header component", () => {
    cy.react("Header").should("exist");
  });

  it("shows no contact message if contacts list is empty", () => {
    cy.contains("No contacts to show.");
  });

  it("renders a contact card when a contact is added", () => {
    cy.addContact();

    cy.react("ContactCard*").should("exist");
  });
});
