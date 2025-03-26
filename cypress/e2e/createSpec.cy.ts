describe('Create Note Page', () => {
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
    cy.get('.nav-button').eq(1).click()
  })

  it('navigates to create page', () => {
    cy.url().should('include', '/dashboard/new')
  })

  it('displays all Create A Note page elements', () => {
    cy.get('h2').should('contain', 'Create New Note')
    cy.get('.form-container').should('exist')
    cy.get('#title').should('exist')
    cy.get('#content').should('exist')
    cy.get('.submit-button').should('exist')
  })

  it('can create a new note', () => {
    const testNote = {
      "id": 100,
      "title": "Post Request",
      "content": "Unique content that is not lorem ipsum"
    }

    cy.intercept('POST', 'http://localhost:3000/api/v1/notes', {
      statusCode: 201,
      body: testNote
    }).as('createNote')

    cy.get('#title').type(testNote.title)
    cy.get('#content').type(testNote.content)
    cy.get('.submit-button').click()

    cy.wait('@createNote').then((interception) => {
      expect(interception.response?.statusCode).to.eq(201)
      expect(interception.response?.body).to.deep.equal(testNote)
    })

    cy.url().should('include', '/dashboard/notes')
  })
})

describe('Sad paths', () => {
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
    cy.get('.nav-button').eq(1).click()
  })

  it('returns error if Title is blank', () => {
    const errorResponse = {
      errors: ["Title can't be blank"]
    }

    cy.intercept('POST', 'http://localhost:3000/api/v1/notes', {
      statusCode: 422,
      body: errorResponse
    }).as('noTitleNote')

    cy.get('#content').type("No Title, only Content")
    cy.get('.submit-button').click()

    cy.wait('@noTitleNote').then((interception) => {
      expect(interception.response?.statusCode).to.eq(422)
      expect(interception.response?.body).to.deep.equal(errorResponse)
    })
    
    cy.get('.error-message').should('contain', "Failure creating new note.");
  })

  it('returns error if Content is blank', () => {
    const errorResponse = {
      errors: ["Content can't be blank"]
    }

    cy.intercept('POST', 'http://localhost:3000/api/v1/notes', {
      statusCode: 422,
      body: errorResponse
    }).as('noContentNote')

    cy.get('#content').type("No Content, only Title")
    cy.get('.submit-button').click()

    cy.wait('@noContentNote').then((interception) => {
      expect(interception.response?.statusCode).to.eq(422)
      expect(interception.response?.body).to.deep.equal(errorResponse)
    })

    cy.get('.error-message').should('contain', "Failure creating new note.");
  })
})