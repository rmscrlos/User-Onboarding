//my tests

describe("Form Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  const nameInput = () => cy.get("input[name=name]");
  const emailInput = () => cy.get("input[name=email]");
  const passInput = () => cy.get("input[name=password");
  const termsInput = () => cy.get("input[name=terms");
  const submitBtn = () => cy.get("button[type=submit");

  it("Get name and type name in it", () => {
    nameInput()
        .should('exist')
        .type("Carlos Ramos")
        .should("have.value", "Carlos Ramos")
  });

  it("Get email input and write an email in it", () => {
    emailInput()
        .should("exist")
        .type("whatever@watev.io")
        .should("have.value", "whatever@watev.io")
  });

  it("Get password input and write a password in it", () => {
    passInput()
        .should("exist")
        .type("whatever12345!")
        .should("have.value", "whatever12345!")
  });

  it("Check the Terms & Conditions", () => {
    termsInput()
        .should("exist")
        .click()
  });

  it("Submit form test", () => {
    submitBtn()
        .should("exist")
        .click()
  })
});