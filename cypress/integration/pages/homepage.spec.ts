describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  
  it("renders the Header component", () => {
    cy.get("#header").should("exist");
  });

  it("shows no contact message if contacts list is empty ", () => {
    cy.contains("No contacts to show.");
  });
});
