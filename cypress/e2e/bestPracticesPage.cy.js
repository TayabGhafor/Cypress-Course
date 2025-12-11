/// <reference types="cypress" />

describe('Best Practices Page Tests', () => {
  beforeEach(() => {
    cy.visit('/best-practices')
  })

  it('should display the best practices page heading', () => {
    cy.get('h1').should('contain', 'Best Practices (recommended by Cypress)')
  })

  it('should display all 8 best practices in accordion', () => {
    cy.get('[class*="MuiAccordion"]').should('have.length', 8)
    cy.contains('Best Practice #1) Test unhappy paths').should('be.visible')
    cy.contains('Best Practice #2) Use stable selectors').should('be.visible')
    cy.contains('Best Practice #3) Do not assign return values').should('be.visible')
    cy.contains('Best Practice #4) Do not test external sites').should('be.visible')
    cy.contains('Best Practice #5) Keep tests independent').should('be.visible')
    cy.contains('Best Practice #6) Do not worry about writing tiny tests').should('be.visible')
    cy.contains('Best Practice #7) Clean up state before tests run').should('be.visible')
    cy.contains('Best Practice #8) Using arbitrary cy.wait()').should('be.visible')
  })

  it('should expand and display details for each best practice', () => {
    // Test Best Practice #1
    cy.contains('Best Practice #1) Test unhappy paths').click()
    cy.contains("Don't just test the 'happy path'").should('be.visible')
    cy.contains('maliciously using your app').should('be.visible')
    
    // Test Best Practice #2
    cy.contains('Best Practice #2) Use stable selectors').click()
    cy.contains('Use data-* attributes to provide context').should('be.visible')
    cy.contains("Don't target elements based on CSS attributes").should('be.visible')
    
    // Test Best Practice #3
    cy.contains('Best Practice #3) Do not assign return values').click()
    cy.contains('Cypress does NOT run synchonously').should('be.visible')
    
    // Test Best Practice #4
    cy.contains('Best Practice #4) Do not test external sites').click()
    cy.contains('Only test websites that you control').should('be.visible')
    cy.contains('cy.request()').should('be.visible')
    cy.contains('cy.session()').should('be.visible')
    
    // Test Best Practice #5
    cy.contains('Best Practice #5) Keep tests independent').click()
    cy.contains("Don't make one test dependent on another").should('be.visible')
    
    // Test Best Practice #6
    cy.contains('Best Practice #6) Do not worry about writing tiny tests').click()
    cy.contains('Writing tiny tests, like unit tests, is non-performant').should('be.visible')
    cy.contains('Cypress resets various state').should('be.visible')
    
    // Test Best Practice #7
    cy.contains('Best Practice #7) Clean up state before tests run').click()
    cy.contains("Don't clean up state with after or afterEach").should('be.visible')
    cy.contains('incrementally writing tests').should('be.visible')
    
    // Test Best Practice #8
    cy.contains('Best Practice #8) Using arbitrary cy.wait()').click()
    cy.contains('Use route aliases or assertions to guard Cypress').should('be.visible')
  })

  it('should allow expanding multiple best practices simultaneously', () => {
    cy.contains('Best Practice #1) Test unhappy paths').click()
    cy.contains('Best Practice #2) Use stable selectors').click()
    cy.contains('Best Practice #3) Do not assign return values').click()
    cy.contains('Best Practice #4) Do not test external sites').click()
    
    cy.get('[class*="MuiAccordionDetails"]').filter(':visible').should('have.length.at.least', 4)
  })

  it('should collapse accordion items when clicked again', () => {
    cy.contains('Best Practice #1) Test unhappy paths').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('be.visible')
    
    cy.contains('Best Practice #1) Test unhappy paths').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('not.be.visible')
  })

  it('should display important warnings and notes in practice details', () => {
    cy.contains('Best Practice #2) Use stable selectors').click()
    cy.contains("Don't target elements").should('be.visible')
    cy.contains("Don't use too generic selector").should('be.visible')
    
    cy.contains('Best Practice #4) Do not test external sites').click()
    cy.contains('Only test websites that you control').should('be.visible')
  })
})

