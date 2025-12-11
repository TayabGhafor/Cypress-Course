/// <reference types="cypress" />

describe('Forms Page Tests', () => {
  beforeEach(() => {
    cy.visit('/forms')
  })

  it('should display the forms page heading', () => {
    cy.get('h1').should('contain', 'Testing Forms')
  })

  it('should display the accordion with form testing steps', () => {
    cy.get('[class*="MuiAccordion"]').should('have.length', 5)
    cy.contains('Step 1) Get Form').should('be.visible')
    cy.contains('Step 2) Type In Form').should('be.visible')
    cy.contains('Step 3) Subscribe').should('be.visible')
    cy.contains('Step 4) Test success/fail').should('be.visible')
    cy.contains('Step 5) Test validation').should('be.visible')
  })

  it('should display email input field', () => {
    cy.get('input[type="text"]').should('be.visible')
    cy.get('input[type="text"]').should('have.attr', 'placeholder').and('include', 'Email')
  })

  it('should display Subscribe button', () => {
    cy.contains('button', 'Subscribe').should('be.visible')
    cy.contains('button', 'Subscribe').should('be.enabled')
  })

  it('should allow typing in the email input', () => {
    const email = 'test@example.com'
    cy.get('input[type="text"]').type(email)
    cy.get('input[type="text"]').should('have.value', email)
  })

  it('should show success message for valid email', () => {
    const validEmail = 'user@example.com'
    cy.get('input[type="text"]').type(validEmail)
    cy.contains('button', 'Subscribe').click()
    cy.contains('Successfully subbed: user@example.com!').should('be.visible')
  })

  it('should show error message for invalid email (no .com)', () => {
    const invalidEmail = 'user@example'
    cy.get('input[type="text"]').type(invalidEmail)
    cy.contains('button', 'Subscribe').click()
    cy.contains('Invalid email: user@example!').should('be.visible')
  })

  it('should show fail message for empty email', () => {
    cy.contains('button', 'Subscribe').click()
    cy.contains('fail!').should('be.visible')
  })

  it('should clear input and message after 3 seconds', () => {
    const email = 'test@example.com'
    cy.get('input[type="text"]').type(email)
    cy.contains('button', 'Subscribe').click()
    cy.contains('Successfully subbed: test@example.com!').should('be.visible')
    
    // Wait for message to disappear (3 seconds)
    cy.wait(3100)
    cy.get('input[type="text"]').should('have.value', '')
    cy.contains('Successfully subbed').should('not.exist')
  })

  it('should handle multiple form submissions', () => {
    // First submission - valid
    cy.get('input[type="text"]').type('first@test.com')
    cy.contains('button', 'Subscribe').click()
    cy.contains('Successfully subbed: first@test.com!').should('be.visible')
    
    // Wait for reset
    cy.wait(3100)
    
    // Second submission - invalid
    cy.get('input[type="text"]').type('invalid@test')
    cy.contains('button', 'Subscribe').click()
    cy.contains('Invalid email: invalid@test!').should('be.visible')
  })

  it('should validate various email formats', () => {
    const testCases = [
      { email: 'test@example.com', shouldPass: true },
      { email: 'user.name@domain.co.uk', shouldPass: true },
      { email: 'test@example', shouldPass: false },
      { email: 'testexample.com', shouldPass: false },
      { email: '@example.com', shouldPass: true }, // Technically has .com
    ]

    testCases.forEach(({ email, shouldPass }) => {
      cy.get('input[type="text"]').clear().type(email)
      cy.contains('button', 'Subscribe').click()
      
      if (shouldPass) {
        cy.contains('Successfully subbed').should('be.visible')
      } else {
        cy.contains('Invalid email').should('be.visible')
      }
      
      cy.wait(3100) // Wait for reset
    })
  })

  it('should clear input field after successful submission', () => {
    cy.get('input[type="text"]').type('test@example.com')
    cy.contains('button', 'Subscribe').click()
    cy.wait(3100)
    cy.get('input[type="text"]').should('have.value', '')
  })
})

