/// <reference types="cypress" />

describe('Component Page Tests', () => {
  beforeEach(() => {
    cy.visit('/component')
  })

  it('should display the component page heading', () => {
    cy.get('h1').should('contain', 'Component Testing')
  })

  it('should display all component testing topics in accordion', () => {
    cy.get('[class*="MuiAccordion"]').should('have.length', 4)
    cy.contains('Overview').should('be.visible')
    cy.contains('Component Vs E2E').should('be.visible')
    cy.contains('Additional configuration').should('be.visible')
    cy.contains('Example').should('be.visible')
  })

  it('should expand and display details for each topic', () => {
    // Test Overview
    cy.contains('Overview').click()
    cy.contains('Cypress also allows you to test individual components').should('be.visible')
    
    // Test Component Vs E2E
    cy.contains('Component Vs E2E').click()
    cy.contains('Cypress Component Testing uses the same test runner').should('be.visible')
    cy.contains('faster tests and fewer dependencies').should('be.visible')
    
    // Test Additional configuration
    cy.contains('Additional configuration').click()
    cy.contains('You may need to add additional configuration').should('be.visible')
    cy.contains('defineConfig').should('be.visible')
    cy.contains('component:').should('be.visible')
    cy.contains('devServer:').should('be.visible')
    
    // Test Example
    cy.contains('Example').click()
    cy.contains('You can mount a component using cy.mount()').should('be.visible')
    cy.contains("Let's go test our Accordion").should('be.visible')
  })

  it('should allow expanding multiple topics simultaneously', () => {
    cy.contains('Overview').click()
    cy.contains('Component Vs E2E').click()
    cy.contains('Additional configuration').click()
    
    cy.get('[class*="MuiAccordionDetails"]').filter(':visible').should('have.length.at.least', 3)
  })

  it('should display code examples in configuration section', () => {
    cy.contains('Additional configuration').click()
    cy.contains('const { defineConfig }').should('be.visible')
    cy.contains('module.exports = defineConfig').should('be.visible')
    cy.contains("framework: 'next'").should('be.visible')
    cy.contains("bundler: 'webpack'").should('be.visible')
  })

  it('should collapse accordion items when clicked again', () => {
    cy.contains('Overview').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('be.visible')
    
    cy.contains('Overview').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('not.be.visible')
  })
})

