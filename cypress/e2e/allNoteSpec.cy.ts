describe('All Notes Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/notes', {
      statusCode: 200,
      fixture: 'allNotes'
    }).as('noteList')

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
    cy.get('.nav-button').eq(0).click()
  })

  it('navigates to all notes page', () => {
    cy.url().should('include', '/dashboard/notes')
    // cy.wait('@getNotesCount')
    // cy.wait('@getSubjectsCount')
  })

  it('displays All Notes elements', () => {
    cy.wait('@noteList')
    cy.get('h2').should('contain', 'All Notes')
    cy.get('.note-list-container').should('exist')
    cy.get('.note-card').should('have.length', 4) 

    cy.get('.note-card').eq(0).find('h3').should('contain', 'example 1')
    cy.get('.note-card').eq(1).find('h3').should('contain', 'example 2')
    cy.get('.note-card').eq(2).find('h3').should('contain', 'example 3')
    cy.get('.note-card').eq(3).find('h3').should('contain', 'example 4')

    cy.get('.note-card').eq(0).find('p').should('contain', 'Lorem ipsum dolor sit amet')
    cy.get('.note-card').eq(1).find('p').should('contain', 'Lorem ipsum dolor sit amet')
    cy.get('.note-card').eq(2).find('p').should('contain', 'Lorem ipsum dolor sit amet')
    cy.get('.note-card').eq(3).find('p').should('contain', 'Lorem ipsum dolor sit amet')
  })

  it('can delete a note', () => {
    cy.wait('@noteList')
    cy.get('h2').should('contain', 'All Notes')
    cy.get('.note-list-container').should('exist')
    cy.get('.note-card').should('have.length', 4) 

    cy.get('.note-card').eq(3).get('.delete-button').click()
  })
})

describe('Sad Paths', () => {
  it('shows a message when no notes are in database', () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/notes', {
      statusCode: 200,
      body: [] 
    }).as('emptyNoteList')

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
    
    cy.visit('http://localhost:4200')
    cy.get('.cta-button').click()
    
    cy.get('.nav-button').eq(0).click()
    cy.wait('@emptyNoteList')

    cy.get('.note-list-container').should('exist')
    cy.contains('p', 'No notes found.').should('exist')
  })

  it('shows a error when server fails', () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/notes', {
      statusCode: 500,
      body: { error: "Server error" }
    }).as('noteListError')

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
    
    cy.visit('http://localhost:4200')
    cy.get('.cta-button').click()
    
    cy.get('.nav-button').eq(0).click()
    cy.wait('@noteListError')

    cy.get('.error-message').should('exist').and('contain', 'Failed to load notes.')
  })
})