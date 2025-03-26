describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/dashboard', {
      statusCode: 200,
      body: '<app-dashboard></app-dashboard>'
    }).as('dashboardLoad')

    cy.intercept('GET', 'http://localhost:3000/api/v1/notes/count', {
      statusCode: 200,
      fixture: "noteCount"
    }).as('getNotesCount')

    cy.intercept('GET', 'http://localhost:3000/api/v1/subjects/count', {
      statusCode: 200,
      fixture: "subjectCount",
    }).as('getSubjectsCount')
    
    cy.visit('http://localhost:4200') // replace with deployed URL before production
    cy.get('.cta-button').click()
  })

  it('navigates to dashboard', () => {
    cy.url().should('include', '/dashboard')
    cy.wait('@getNotesCount')
    cy.wait('@getSubjectsCount')
  })

  it('displays Dashboard elements', () => {
    cy.get('h2').should('contain', 'Dashboard')
    cy.get('.nav-button').eq(0).should('have.text', 'See Notes')
    cy.get('.nav-button').eq(1).should('have.text', 'New Note')
    cy.get('.welcome-container p').eq(0).should('contain', 'You have 123 notes, click "New Note" to make some more!')
    cy.get('.welcome-container p').eq(1).should('contain', 'You have 123 subjects, expand your knowledge by researching more.')
  })
})

describe('Sad Paths', () => {
  it('displays loading message when API calls fail', () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/notes/count', {
      statusCode: 500,
      body: { error: "Server error" }
    }).as('getNotesCount')

    cy.intercept('GET', 'http://localhost:3000/api/v1/subjects/count', {
      statusCode: 500,
      body: { error: "Server error" }
    }).as('getSubjectsCount')

    cy.visit('http://localhost:4200') 
    cy.get('.cta-button').click()
 
    cy.get('.welcome-container p').eq(0).should('contain', 'Loading notes count...')
    cy.get('.welcome-container p').eq(1).should('contain', 'Loading subjects count...')
  })

  it('displays error message for failure loading subject count', () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/notes/count', {
      statusCode: 200,
      body: { count: 123 }
    }).as('getNotesCount')
  
    cy.intercept('GET', 'http://localhost:3000/api/v1/subjects/count', {
      statusCode: 500,
      body: { error: "Server error" }
    }).as('getSubjectsCount')
  
    cy.visit('http://localhost:4200') 
    cy.get('.cta-button').click()
  
    cy.wait(['@getNotesCount', '@getSubjectsCount'])
  
    cy.get('.error-message').should('exist').and('contain', 'Failure loading subject count.')
  })

  it('displays error message for failure loading note count', () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/notes/count', {
      statusCode: 500,
      body: { error: "Server error" }
    }).as('getNotesCount')
  
    cy.intercept('GET', 'http://localhost:3000/api/v1/subjects/count', {
      statusCode: 200,
      body: { count: 123 }
    }).as('getSubjectsCount')
  
    cy.visit('http://localhost:4200') 
    cy.get('.cta-button').click()
  
    cy.wait(['@getNotesCount', '@getSubjectsCount'])
  
    cy.get('.error-message').should('exist').and('contain', 'Failure loading note count.')
  })
})