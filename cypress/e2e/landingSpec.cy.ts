describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/') // replace with deployed URL before production
  })

  it('displays landing page elements', () => {
    cy.get('h1').should('contain', 'Welcome to Note Taker')

    cy.get('p').should('contain','Your go-to app for organizing notes about new frameworks and languages!')

    cy.get('.cta-button').should('exist').and('contain', 'Get Started')
  })

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

  it('displays footer elements', () => {
    cy.get('footer p').should('contain', 'Created by Joe Chirchirillo')
  })

  it('displays footer nav links', () => {
    cy.get('footer p').should('have.text', 'Created by Joe Chirchirillo')
    cy.get('footer a').eq(0).should('have.text', 'LinkedIn').and('have.attr', 'href', 'https://www.linkedin.com/in/joechirchirillo/')
    cy.get('footer a').eq(1).should('have.text', 'GitHub').and('have.attr', 'href', 'https://github.com/joechirchirillo')
    cy.get('footer a').eq(2).should('have.text', 'App Repo').and('have.attr', 'href', 'https://github.com/jchirch/noteTaker')
  })

  it('navigates to dashboard', () => {
    cy.intercept('GET', '/dashboard', {
      statusCode: 200,
      body: '<app-dashboard></app-dashboard>'
    }).as('dashboardLoad')

    cy.intercept('GET', 'http://localhost:3000/api/v1/notes/count', {
      statusCode: 200,
      fixture: "noteCount",
    }).as('getNotesCount')

    cy.intercept('GET', 'http://localhost:3000/api/v1/subjects/count', {
      statusCode: 200,
      fixture: "subjectCount",
    }).as('getSubjectsCount')

    cy.get('.cta-button').click()
    cy.url().should('include', '/dashboard')
    cy.wait(['@getNotesCount', '@getSubjectsCount'])

    cy.get('h2').should('contain', 'Dashboard')
  })
})