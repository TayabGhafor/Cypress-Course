/// <reference types="cypress" />

describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display navigation bar with all links', () => {
    cy.get('.nav-bar').should('be.visible')
    cy.get('.nav-bar').within(() => {
      cy.contains('Why Cypress?').should('be.visible')
      cy.contains('Overview').should('be.visible')
      cy.contains('Fundamentals').should('be.visible')
      cy.contains('Forms').should('be.visible')
      cy.contains('Examples').should('be.visible')
      cy.contains('Component').should('be.visible')
      cy.contains('Best Practices').should('be.visible')
    })
  })

  it('should navigate to Overview page', () => {
    cy.contains('Overview').click()
    cy.url().should('include', '/overview')
    cy.get('h1').should('contain', 'Overview & Install')
  })

  it('should navigate to Fundamentals page', () => {
    cy.contains('Fundamentals').click()
    cy.url().should('include', '/fundamentals')
    cy.get('h1').should('contain', 'Testing Fundamentals')
  })

  it('should navigate to Forms page', () => {
    cy.contains('Forms').click()
    cy.url().should('include', '/forms')
    cy.get('h1').should('contain', 'Testing Forms')
  })

  it('should navigate to Examples page', () => {
    cy.contains('Examples').click()
    cy.url().should('include', '/examples')
    cy.get('h1').should('contain', 'Examples')
  })

  it('should navigate to Component page', () => {
    cy.contains('Component').click()
    cy.url().should('include', '/component')
    cy.get('h1').should('contain', 'Component Testing')
  })

  it('should navigate to Best Practices page', () => {
    cy.contains('Best Practices').click()
    cy.url().should('include', '/best-practices')
    cy.get('h1').should('contain', 'Best Practices')
  })

  it('should navigate back to home page via Why Cypress? link', () => {
    cy.contains('Examples').click()
    cy.url().should('include', '/examples')
    cy.contains('Why Cypress?').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('h1').should('contain', 'Why Cypress?')
  })

  it('should maintain navigation bar visibility across all pages', () => {
    const pages = ['/overview', '/fundamentals', '/forms', '/examples', '/component', '/best-practices']
    
    pages.forEach(page => {
      cy.visit(page)
      cy.get('.nav-bar').should('be.visible')
    })
  })
})

