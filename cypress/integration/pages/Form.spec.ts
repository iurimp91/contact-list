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

  context("name input", () => {
    it("gets error status when form is submitted with it empty", () => {
      cy.get("button[type=submit]").click();

      cy.get("#name-input").next().should("have.css", "border-color").and("equal", "rgb(211, 47, 47)");
    
      cy.get("label").contains("NAME").parent().should("contain", "Please, this field must be filled.");
    });

    it("accepts strings as its value", () => {
      cy.get("#name-input").type("Test").should("have.value", "Test");
    });
  });
});
