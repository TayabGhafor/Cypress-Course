/// <reference types="cypress" />

describe('End-to-End Integration Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should complete a full user journey through the application', () => {
    // Start at home page
    cy.get('h1').should('contain', 'Why Cypress?')
    
    // Navigate to Overview
    cy.contains('Overview').click()
    cy.url().should('include', '/overview')
    cy.get('h1').should('contain', 'Overview & Install')
    cy.contains('Step 1) Clone my repo').should('be.visible')
    
    // Navigate to Fundamentals
    cy.contains('Fundamentals').click()
    cy.url().should('include', '/fundamentals')
    cy.get('h1').should('contain', 'Testing Fundamentals')
    cy.contains('Fundamental 1) Describe blocks').should('be.visible')
    
    // Navigate to Forms and test form
    cy.contains('Forms').click()
    cy.url().should('include', '/forms')
    cy.get('input[type="text"]').type('test@example.com')
    cy.contains('button', 'Subscribe').click()
    cy.contains('Successfully subbed: test@example.com!').should('be.visible')
    
    // Navigate to Examples and test GrudgeList
    cy.contains('Examples').click()
    cy.url().should('include', '/examples')
    cy.get('input[type="text"]').type('Integration test grudge')
    cy.contains('button', 'Add Grudge').click()
    cy.contains('Integration test grudge').should('be.visible')
    
    // Navigate to Component page
    cy.contains('Component').click()
    cy.url().should('include', '/component')
    cy.get('h1').should('contain', 'Component Testing')
    
    // Navigate to Best Practices
    cy.contains('Best Practices').click()
    cy.url().should('include', '/best-practices')
    cy.get('h1').should('contain', 'Best Practices')
    
    // Return to home
    cy.contains('Why Cypress?').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should test accordion interactions across multiple pages', () => {
    // Home page accordions
    cy.visit('/')
    cy.contains('Reason 1').click()
    cy.contains('An all-in-one testing framework').should('be.visible')
    
    // Forms page accordions
    cy.contains('Forms').click()
    cy.contains('Step 1) Get Form').click()
    cy.contains('First, we need to get the form').should('be.visible')
    
    // Examples page accordions
    cy.contains('Examples').click()
    cy.contains('Example 1) Multi-page testing').click()
    cy.contains('You can quite easily write tests across pages').should('be.visible')
  })

  it('should test form validation and then navigate to examples', () => {
    cy.visit('/forms')
    
    // Test invalid email
    cy.get('input[type="text"]').type('invalid@test')
    cy.contains('button', 'Subscribe').click()
    cy.contains('Invalid email: invalid@test!').should('be.visible')
    
    // Wait for reset
    cy.wait(3100)
    
    // Test valid email
    cy.get('input[type="text"]').type('valid@example.com')
    cy.contains('button', 'Subscribe').click()
    cy.contains('Successfully subbed: valid@example.com!').should('be.visible')
    
    // Navigate to examples and add grudge
    cy.contains('Examples').click()
    cy.get('input[type="text"]').type('Form tested grudge')
    cy.contains('button', 'Add Grudge').click()
    cy.contains('Form tested grudge').should('be.visible')
  })

  it('should test navigation persistence across page interactions', () => {
    // Start at home, interact with accordion
    cy.visit('/')
    cy.contains('Reason 2').click()
    
    // Navigate to forms, interact with form
    cy.contains('Forms').click()
    cy.get('input[type="text"]').type('test@example.com')
    cy.contains('button', 'Subscribe').click()
    
    // Navigate to examples, interact with grudge list
    cy.contains('Examples').click()
    cy.get('input[type="text"]').type('Navigation test')
    cy.contains('button', 'Add Grudge').click()
    
    // Verify navigation bar is still visible
    cy.get('.nav-bar').should('be.visible')
    
    // Navigate back and verify state
    cy.contains('Why Cypress?').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('.nav-bar').should('be.visible')
  })

  it('should test PostButton network request and then continue workflow', () => {
    cy.visit('/examples')
    
    // Intercept and test POST request
    cy.intercept('POST', 'http://localhost:3000/examples', {
      statusCode: 200,
      body: { success: true }
    }).as('postData')
    
    cy.contains('button', 'Post Data').click()
    cy.wait('@postData')
    
    // Continue with grudge list interaction
    cy.get('input[type="text"]').type('After POST grudge')
    cy.contains('button', 'Add Grudge').click()
    cy.contains('After POST grudge').should('be.visible')
  })
})

