describe('Header and Footer', () => {
  beforeEach(() => {

    cy.intercept('GET', '/dashboard', {
      statusCode: 200,
      body: '<app-dashboard></app-dashboard>'
    }).as('dashboardLoad')

    cy.intercept('GET', 'http://localhost:3000/api/v1/notes/count', {
      statusCode: 200,
      body: { count: 5 }
    }).as('getNotesCount')

    cy.intercept('GET', 'http://localhost:3000/api/v1/subjects/count', {
      statusCode: 200,
      body: { count: 3 }
    }).as('getSubjectsCount')

    cy.intercept('GET', 'http://localhost:3000/api/v1/notes', {
      statusCode: 200,
      fixture: 'allNotes'
    }).as('getAllNotes')

    cy.visit('http://localhost:4200/')
  })

  describe('Header Links', () => {
    it('displays header elements', () => {
      cy.get('.logo-container h1').first().should('have.text', 'Note')
      cy.get('.logo-container h1').last().should('have.text', 'Taker')
    })
    
    it('displays header nav links', () => {
      cy.get('nav a').eq(0).should('have.text', 'Home').and('have.attr', 'routerLink', '/')
      cy.get('nav a').eq(1).should('have.text', 'Dashboard').and('have.attr', 'routerLink', '/dashboard')
      cy.get('nav a').eq(2).should('have.text', 'All Notes').and('have.attr', 'routerLink', '/dashboard/notes')
      cy.get('nav a').eq(3).should('have.text', 'Create Note').and('have.attr', 'routerLink', '/dashboard/new')
    })
    
    it('should navigate to Home', () => {
      cy.get('nav a').contains('Home').click()
      cy.url().should('eq', 'http://localhost:4200/')
    })

    it('should navigate to Dashboard', () => {
      cy.get('nav a').contains('Dashboard').click()
      cy.url().should('include', '/dashboard')
      cy.get('h2').should('contain', 'Dashboard')
    })

    it('should navigate to All Notes', () => {
      cy.get('nav a').contains('All Notes').click()
      cy.url().should('include', '/dashboard/notes')
      cy.get('.note-list').should('exist')
    })

    it('should navigate to Create Note', () => {
      cy.get('nav a').contains('Create Note').click()
      cy.url().should('include', '/dashboard/new')
      cy.get('h2').should('contain', 'Create New Note')
    })
  })

  describe('Footer Links', () => {
    it('displays footer elements with correct links', () => {
      cy.get('footer p').should('have.text', 'Created by Joe Chirchirillo')
      cy.get('footer a').eq(0).should('have.text', 'LinkedIn').and('have.attr', 'href', 'https://www.linkedin.com/in/joechirchirillo/')
      cy.get('footer a').eq(1).should('have.text', 'GitHub').and('have.attr', 'href', 'https://github.com/joechirchirillo')
      cy.get('footer a').eq(2).should('have.text', 'App Repo').and('have.attr', 'href', 'https://github.com/jchirch/noteTaker')
    })
  })
})