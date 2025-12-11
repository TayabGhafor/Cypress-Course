/// <reference types="cypress" />

describe('Fundamentals Page Tests', () => {
  beforeEach(() => {
    cy.visit('/fundamentals')
  })

  it('should display the fundamentals page heading', () => {
    cy.get('h1').should('contain', 'Testing Fundamentals')
  })

  it('should display all 8 fundamental topics in accordion', () => {
    cy.get('[class*="MuiAccordion"]').should('have.length', 8)
    cy.contains('Fundamental 1) Describe blocks').should('be.visible')
    cy.contains('Fundamental 2) It blocks').should('be.visible')
    cy.contains('Fundamental 3) Commands & interacting with elements').should('be.visible')
    cy.contains('Fundamental 4) Getting elements').should('be.visible')
    cy.contains('Fundamental 5) Command chaining & assertions').should('be.visible')
    cy.contains('Fundamental 6) Focussing on a single test').should('be.visible')
    cy.contains('Fundamental 7) beforeEach').should('be.visible')
    cy.contains('Fundamental 8) Custom commands').should('be.visible')
  })

  it('should expand and display details for each fundamental', () => {
    // Test Fundamental 1
    cy.contains('Fundamental 1) Describe blocks').click()
    cy.contains('Your tests will exist in a describe block').should('be.visible')
    
    // Test Fundamental 2
    cy.contains('Fundamental 2) It blocks').click()
    cy.contains('Within your describe block, you will also have it blocks').should('be.visible')
    
    // Test Fundamental 3
    cy.contains('Fundamental 3) Commands & interacting with elements').click()
    cy.contains('Cypress gives you various commands to help you test').should('be.visible')
    cy.contains('cy.visit').should('be.visible')
    
    // Test Fundamental 4
    cy.contains('Fundamental 4) Getting elements').click()
    cy.contains("You're often going to want to get an element from the DOM").should('be.visible')
    
    // Test Fundamental 5
    cy.contains('Fundamental 5) Command chaining & assertions').click()
    cy.contains('After you get an element, you probably want to do something').should('be.visible')
    
    // Test Fundamental 6
    cy.contains('Fundamental 6) Focussing on a single test').click()
    cy.contains('You can use it.only() to run a single test').should('be.visible')
    
    // Test Fundamental 7
    cy.contains('Fundamental 7) beforeEach').click()
    cy.contains('You can use a beforeEach function to perform certain actions').should('be.visible')
    
    // Test Fundamental 8
    cy.contains('Fundamental 8) Custom commands').click()
    cy.contains("You aren't limited to just the cy.X commands").should('be.visible')
    cy.contains('cypress/support/commands.ts').should('be.visible')
  })

  it('should allow expanding multiple fundamentals at once', () => {
    cy.contains('Fundamental 1) Describe blocks').click()
    cy.contains('Fundamental 2) It blocks').click()
    cy.contains('Fundamental 3) Commands & interacting with elements').click()
    
    cy.get('[class*="MuiAccordionDetails"]').filter(':visible').should('have.length.at.least', 3)
  })

  it('should collapse accordion items when clicked again', () => {
    cy.contains('Fundamental 1) Describe blocks').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('be.visible')
    
    cy.contains('Fundamental 1) Describe blocks').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('not.be.visible')
  })
})

