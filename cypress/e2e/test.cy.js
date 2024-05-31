describe('testing login and logout', () => {
  it('Goes to the site', () => {
    cy.visit('http://localhost:3000/')
    cy.get("form")
    cy.get('input[name="login"]').type("Nastya")
    cy.get('input[name="password"]').type("12345")
    cy.wait(1000)
    cy.get("#button-login").click()
    cy.wait(1000)
    cy.get("#logout").click()
  })
  
})