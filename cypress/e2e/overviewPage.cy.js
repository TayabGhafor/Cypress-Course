/// <reference types="cypress" />

describe('Overview Page Tests', () => {
  beforeEach(() => {
    cy.visit('/overview')
  })

  it('should display the overview page heading', () => {
    cy.get('h1').should('contain', 'Overview & Install')
  })

  it('should display all installation steps in accordion', () => {
    cy.get('[class*="MuiAccordion"]').should('have.length', 5)
    cy.contains('Step 1) Clone my repo').should('be.visible')
    cy.contains('Step 2) Install dependencies').should('be.visible')
    cy.contains('Step 4) Run app').should('be.visible')
    cy.contains('Step 4) Install Cypress').should('be.visible')
    cy.contains('Step 5) Open & configure Cypress').should('be.visible')
  })

  it('should expand and display step details', () => {
    cy.contains('Step 1) Clone my repo').click()
    cy.contains('git clone https://github.com/coderyansolomon/cypress-course.git').should('be.visible')
    
    cy.contains('Step 2) Install dependencies').click()
    cy.contains('npm install').should('be.visible')
    
    cy.contains('Step 4) Run app').click()
    cy.contains('npm run dev').should('be.visible')
    
    cy.contains('Step 4) Install Cypress').click()
    cy.contains('npm install cypress --save-dev').should('be.visible')
    
    cy.contains('Step 5) Open & configure Cypress').click()
    cy.contains('npx cypress open').should('be.visible')
  })

  it('should allow multiple steps to be expanded simultaneously', () => {
    cy.contains('Step 1) Clone my repo').click()
    cy.contains('Step 2) Install dependencies').click()
    cy.contains('Step 4) Run app').click()
    
    cy.get('[class*="MuiAccordionDetails"]').filter(':visible').should('have.length.at.least', 3)
  })

  it('should collapse accordion items when clicked again', () => {
    cy.contains('Step 1) Clone my repo').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('be.visible')
    
    cy.contains('Step 1) Clone my repo').click()
    cy.get('[class*="MuiAccordionDetails"]').first().should('not.be.visible')
  })
})

