/// <reference types="cypress" />

describe('Home Page Basic Test', () => {
  it('should visit the home page successfully', () => {
    cy.visit('/')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('h1').should('contain', 'Why Cypress?')
  })

  it('should load the page with all elements', () => {
    cy.visit('/')
    cy.get('h1').should('be.visible')
    cy.get('.nav-bar').should('be.visible')
    cy.get('[class*="MuiAccordion"]').should('have.length', 7)
  })
})
