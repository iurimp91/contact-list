describe("Form tests", () => {
  beforeEach(() => {
    cy.visit("/form");
    cy.waitForReact();
  });

  it("renders the Header component without the add new button", () => {
    cy.react("Header").should("exist").react("AddNewButton").should("not.exist");
  });

  context("name input", () => {
    it("gets error status when form is submitted with it empty", () => {
      cy.get("button[type=submit]").click();

      cy.react("TextInput", { props: { name: "name" } }).children().should("have.css", "border-color").and("equal", "rgb(211, 47, 47)");

      cy.react("TextInput", { props: { name: "name" } }).should("contain", "Please, this field must be filled.");
    });

    it("accepts strings as its value", () => {
      cy.react("TextInput", { props: { name: "name" } }).type("Test").find("input").should("have.value", "Test");

      cy.get("button[type=submit]").click();

      cy.react("TextInput", { props: { name: "name" } }).find("p").should("not.exist");
    });
  });

  context("email input", () => {
    it("gets error status when form is submitted with it empty", () => {
      cy.get("button[type=submit]").click();

      cy.get("#email-input").next().should("have.css", "border-color").and("equal", "rgb(211, 47, 47)");

      cy.get("label").contains("EMAIL").parent().should("contain", "Please, this field must be filled.");
    });

    it("keeps error status and change error message if the value isn't a valid email (after the first form submit attempt)", () => {
      cy.get("button[type=submit]").click();

      cy.get("#email-input").type("test").next().should("have.css", "border-color").and("equal", "rgb(211, 47, 47)");

      cy.get("label").contains("EMAIL").parent().should("contain", "Please, enter a valid email format.");
    });

    it("accepts emails strings as its value", () => {
      cy.get("#email-input").type("test@test.com").should("have.value", "test@test.com");

      cy.get("button[type=submit]").click();

      cy.get("label").contains("EMAIL").parent().find("p").should("not.exist");
    });
  });

  context("birthday input", () => {
    it("gets error message when form is submitted with it empty", () => {
      cy.get("button[type=submit]").click();

      cy.get("label").contains("BIRTHDAY").parent().should("contain", "Please, enter a valid date format (DD/MM/YYYY).");
    });

    it("keeps error message and change error status if the value isn't a valid date format (after the first form submit attempt)", () => {
      cy.get("button[type=submit]").click();

      cy.react("DateInput").type("99/99/9999").children().should("have.css", "border-color").and("equal", "rgb(211, 47, 47)");

      cy.react("DateInput").should("contain", "Please, enter a valid date format (DD/MM/YYYY).");
    });

    it("keeps error stats and change error message if the value is lesser than 01/01/1900 (after the first form submit attempt)", () => {
      cy.get("button[type=submit]").click();

      cy.react("DateInput").type("01/01/1800").children().should("have.css", "border-color").and("equal", "rgb(211, 47, 47)");

      cy.react("DateInput").should("contain", "Please, enter a date greater than 01/01/1900.");
    });

    it("keeps error stats and change error message if the value is greater than today (after the first form submit attempt)", () => {
      cy.get("button[type=submit]").click();

      cy.react("DateInput").type("01/01/9999").children().should("have.css", "border-color").and("equal", "rgb(211, 47, 47)");

      cy.react("DateInput").should("contain", "Please, enter a date from today or less.");
    });

    it("accepts valid date as its value", () => {
      cy.react("DateInput").type("11/06/1991").find("input").should("have.value", "11/06/1991");

      cy.get("button[type=submit]").click();

      cy.react("DateInput").find("p").should("not.exist");
    });
  });
});
