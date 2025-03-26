describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/') // replace with deployed URL before production
  })

  it('displays landing page elements', () => {
    cy.get('h1').should('contain', 'Welcome to Note Taker')

    cy.get('p').should('contain','Your go-to app for organizing notes about new frameworks and languages!')

    cy.get('.cta-button').should('exist').and('contain', 'Get Started')
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