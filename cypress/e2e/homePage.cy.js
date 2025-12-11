/// <reference types="cypress" />

describe('Home Page Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main heading', () => {
    cy.get('h1').should('contain', 'Why Cypress?')
  })

  it('should display all accordion items', () => {
    // Check that all 7 reasons are present
    cy.get('[class*="MuiAccordion"]').should('have.length', 7)
    
    // Verify all summary texts are visible
    cy.contains('Reason 1').should('be.visible')
    cy.contains('Reason 2').should('be.visible')
    cy.contains('Reason 3').should('be.visible')
    cy.contains('Reason 4').should('be.visible')
    cy.contains('Reason 5').should('be.visible')
    cy.contains('Reason 6').should('be.visible')
    cy.contains('Reason 7').should('be.visible')
  })

  it('should expand and collapse accordion items', () => {
    // Initially, accordion items should be collapsed (details not visible)
    cy.get('[class*="MuiAccordionDetails"]').first().should('not.be.visible')
    
    // Click to expand first accordion
    cy.contains('Reason 1').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('be.visible')
    cy.contains('An all-in-one testing framework').should('be.visible')
    
    // Click again to collapse
    cy.contains('Reason 1').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('not.be.visible')
  })

  it('should display correct details for each reason', () => {
    const reasons = [
      { summary: 'Reason 1', details: 'An all-in-one testing framework, assertion library, with mocking and stubbing' },
      { summary: 'Reason 2', details: 'Focus on E2E and Component Testing -- real world testing' },
      { summary: 'Reason 3', details: 'Runs in the browser and wrote in JavaScript' },
      { summary: 'Reason 4', details: 'Good performance and can be integrated in CI/CD quite easily' },
      { summary: 'Reason 5', details: 'Native access to the DOM and to your app' },
      { summary: 'Reason 6', details: 'Great developer UX' },
      { summary: 'Reason 7', details: 'Generally not flaky if you follow the best practices' }
    ]

    reasons.forEach((reason, index) => {
      cy.contains(reason.summary).click()
      cy.contains(reason.details).should('be.visible')
      // Collapse after checking
      cy.contains(reason.summary).click()
    })
  })

  it('should allow multiple accordions to be expanded simultaneously', () => {
    cy.contains('Reason 1').click()
    cy.contains('Reason 2').click()
    cy.contains('Reason 3').click()
    
    cy.get('[class*="MuiAccordionDetails"]').should('have.length', 7)
    // At least 3 should be visible
    cy.get('[class*="MuiAccordionDetails"]').filter(':visible').should('have.length.at.least', 3)
  })

  it('should have expand icon in each accordion', () => {
    cy.get('[class*="MuiAccordionSummary-expandIconWrapper"]').should('have.length', 7)
    cy.get('[class*="MuiSvgIcon-root"]').should('have.length.at.least', 7)
  })
})

