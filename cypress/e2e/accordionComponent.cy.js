/// <reference types="cypress" />

describe('Accordion Component Tests (Cross-Page)', () => {
  it('should test accordion functionality on home page', () => {
    cy.visit('/')
    cy.get('[class*="MuiAccordion"]').should('have.length', 7)
    
    // Test expand/collapse
    cy.contains('Reason 1').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('be.visible')
    cy.contains('Reason 1').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('not.be.visible')
  })

  it('should test accordion functionality on overview page', () => {
    cy.visit('/overview')
    cy.get('[class*="MuiAccordion"]').should('have.length', 5)
    
    cy.contains('Step 1) Clone my repo').click()
    cy.contains('git clone').should('be.visible')
  })

  it('should test accordion functionality on fundamentals page', () => {
    cy.visit('/fundamentals')
    cy.get('[class*="MuiAccordion"]').should('have.length', 8)
    
    cy.contains('Fundamental 1) Describe blocks').click()
    cy.contains('Your tests will exist in a describe block').should('be.visible')
  })

  it('should test accordion functionality on forms page', () => {
    cy.visit('/forms')
    cy.get('[class*="MuiAccordion"]').should('have.length', 5)
    
    cy.contains('Step 1) Get Form').click()
    cy.contains('First, we need to get the form').should('be.visible')
  })

  it('should test accordion functionality on examples page', () => {
    cy.visit('/examples')
    cy.get('[class*="MuiAccordion"]').should('have.length', 4)
    
    cy.contains('Example 1) Multi-page testing').click()
    cy.contains('You can quite easily write tests across pages').should('be.visible')
  })

  it('should test accordion functionality on component page', () => {
    cy.visit('/component')
    cy.get('[class*="MuiAccordion"]').should('have.length', 4)
    
    cy.contains('Overview').click()
    cy.contains('Cypress also allows you to test individual components').should('be.visible')
  })

  it('should test accordion functionality on best practices page', () => {
    cy.visit('/best-practices')
    cy.get('[class*="MuiAccordion"]').should('have.length', 8)
    
    cy.contains('Best Practice #1) Test unhappy paths').click()
    cy.contains("Don't just test the 'happy path'").should('be.visible')
  })

  it('should verify accordion expand icons are present on all pages', () => {
    const pages = [
      { path: '/', count: 7 },
      { path: '/overview', count: 5 },
      { path: '/fundamentals', count: 8 },
      { path: '/forms', count: 5 },
      { path: '/examples', count: 4 },
      { path: '/component', count: 4 },
      { path: '/best-practices', count: 8 }
    ]

    pages.forEach(({ path, count }) => {
      cy.visit(path)
      cy.get('[class*="MuiAccordionSummary-expandIconWrapper"]').should('have.length', count)
    })
  })
})

