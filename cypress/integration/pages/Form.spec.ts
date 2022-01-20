describe("Form tests", () => {
  beforeEach(() => {
    cy.visit("/form");
    cy.waitForReact();
  });
  
  it("renders the Header component without the add new button", () => {
    cy.react("Header")
      .should("exist")
      .react("AddNewButton")
      .should("not.exist");
  });
});
