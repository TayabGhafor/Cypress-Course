/// <reference types="cypress" />

describe('Examples Page Tests', () => {
  beforeEach(() => {
    cy.visit('/examples')
  })

  describe('Page Structure', () => {
    it('should display the examples page heading', () => {
      cy.get('h1').should('contain', 'Examples')
    })

    it('should display the accordion with examples', () => {
      cy.get('[class*="MuiAccordion"]').should('have.length', 4)
      cy.contains('Example 1) Multi-page testing').should('be.visible')
      cy.contains('Example 2) Intercepts').should('be.visible')
      cy.contains('Example 3) Helpful methods').should('be.visible')
      cy.contains('Example 4) Grudge list').should('be.visible')
    })

    it('should display PostButton component', () => {
      cy.contains('button', 'Post Data').should('be.visible')
    })

    it('should display GrudgeList component', () => {
      cy.contains('Add Some Grudges').should('be.visible')
      cy.get('input[type="text"]').should('be.visible')
      cy.contains('button', 'Add Grudge').should('be.visible')
    })
  })

  describe('GrudgeList Functionality', () => {
    it('should display initial state with "Add Some Grudges" title', () => {
      cy.contains('Add Some Grudges').should('be.visible')
      cy.get('ul li').should('not.exist')
      cy.contains('button', 'Clear').should('not.exist')
    })

    it('should add a grudge to the list', () => {
      const grudgeText = 'My first grudge'
      cy.get('input[type="text"]').type(grudgeText)
      cy.contains('button', 'Add Grudge').click()
      
      cy.contains('Grudges').should('be.visible')
      cy.get('ul li').should('have.length', 1)
      cy.contains(grudgeText).should('be.visible')
      cy.get('input[type="text"]').should('have.value', '')
    })

    it('should add multiple grudges', () => {
      const grudges = ['First grudge', 'Second grudge', 'Third grudge']
      
      grudges.forEach((grudge) => {
        cy.get('input[type="text"]').type(grudge)
        cy.contains('button', 'Add Grudge').click()
      })
      
      cy.get('ul li').should('have.length', 3)
      grudges.forEach((grudge) => {
        cy.contains(grudge).should('be.visible')
      })
    })

    it('should not add empty grudge', () => {
      cy.contains('button', 'Add Grudge').click()
      cy.get('ul li').should('not.exist')
      cy.contains('Add Some Grudges').should('be.visible')
    })

    it('should delete a specific grudge', () => {
      // Add multiple grudges
      cy.get('input[type="text"]').type('Grudge to delete')
      cy.contains('button', 'Add Grudge').click()
      cy.get('input[type="text"]').type('Grudge to keep')
      cy.contains('button', 'Add Grudge').click()
      
      cy.get('ul li').should('have.length', 2)
      
      // Delete first grudge
      cy.contains('Grudge to delete').parent().within(() => {
        cy.contains('button', 'X').click()
      })
      
      cy.get('ul li').should('have.length', 1)
      cy.contains('Grudge to delete').should('not.exist')
      cy.contains('Grudge to keep').should('be.visible')
    })

    it('should clear all grudges', () => {
      // Add multiple grudges
      const grudges = ['Grudge 1', 'Grudge 2', 'Grudge 3']
      grudges.forEach((grudge) => {
        cy.get('input[type="text"]').type(grudge)
        cy.contains('button', 'Add Grudge').click()
      })
      
      cy.get('ul li').should('have.length', 3)
      cy.contains('button', 'Clear').should('be.visible')
      
      // Clear all
      cy.contains('button', 'Clear').click()
      
      cy.get('ul li').should('not.exist')
      cy.contains('Add Some Grudges').should('be.visible')
      cy.contains('button', 'Clear').should('not.exist')
    })

    it('should show Clear button only when grudges exist', () => {
      cy.contains('button', 'Clear').should('not.exist')
      
      cy.get('input[type="text"]').type('Test grudge')
      cy.contains('button', 'Add Grudge').click()
      cy.contains('button', 'Clear').should('be.visible')
      
      cy.contains('button', 'Clear').click()
      cy.contains('button', 'Clear').should('not.exist')
    })

    it('should change title from "Add Some Grudges" to "Grudges" when items exist', () => {
      cy.contains('Add Some Grudges').should('be.visible')
      
      cy.get('input[type="text"]').type('First grudge')
      cy.contains('button', 'Add Grudge').click()
      
      cy.contains('Grudges').should('be.visible')
      cy.contains('Add Some Grudges').should('not.exist')
    })

    it('should handle special characters in grudge text', () => {
      const specialText = 'Grudge with "quotes" & symbols!'
      cy.get('input[type="text"]').type(specialText)
      cy.contains('button', 'Add Grudge').click()
      cy.contains(specialText).should('be.visible')
    })

    it('should handle long text in grudge', () => {
      const longText = 'This is a very long grudge text that should still be displayed properly in the list'
      cy.get('input[type="text"]').type(longText)
      cy.contains('button', 'Add Grudge').click()
      cy.contains(longText).should('be.visible')
    })
  })

  describe('PostButton Functionality', () => {
    it('should make POST request when clicked', () => {
      cy.intercept('POST', 'http://localhost:3000/examples', {
        statusCode: 200,
        body: { success: true }
      }).as('postRequest')
      
      cy.contains('button', 'Post Data').click()
      cy.wait('@postRequest')
    })

    it('should handle POST request errors gracefully', () => {
      cy.intercept('POST', 'http://localhost:3000/examples', {
        statusCode: 500,
        body: { error: 'Server error' }
      }).as('postError')
      
      cy.contains('button', 'Post Data').click()
      cy.wait('@postError')
      // Button should still be visible and functional
      cy.contains('button', 'Post Data').should('be.visible')
    })

    it('should be clickable multiple times', () => {
      cy.intercept('POST', 'http://localhost:3000/examples', {
        statusCode: 200
      }).as('postRequest')
      
      cy.contains('button', 'Post Data').click()
      cy.wait('@postRequest')
      
      cy.contains('button', 'Post Data').click()
      cy.wait('@postRequest')
    })
  })

  describe('Accordion Interactions', () => {
    it('should expand and collapse accordion items', () => {
      cy.contains('Example 1) Multi-page testing').click()
      cy.get('[class*="MuiAccordionDetails"]').first().should('be.visible')
      
      cy.contains('Example 1) Multi-page testing').click()
      cy.get('[class*="MuiAccordionDetails"]').first().should('not.be.visible')
    })

    it('should display correct details for each example', () => {
      cy.contains('Example 1) Multi-page testing').click()
      cy.contains('You can quite easily write tests across pages').should('be.visible')
      
      cy.contains('Example 2) Intercepts').click()
      cy.contains('Cypress provides different ways of working with').should('be.visible')
      
      cy.contains('Example 3) Helpful methods').click()
      cy.contains('Cypress provides a ton of methods').should('be.visible')
      
      cy.contains('Example 4) Grudge list').click()
      cy.contains("Let's test some actual state changes").should('be.visible')
    })
  })
})

