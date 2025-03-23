# NoteTaker

NoteTaker is a simple note-taking app built with Angular as a way to document my learning journey with the framework. Each note represents something I learned about Angular while building this app. The goal was to familiarize myself with a new framework, implement CRUD functionality to create a simple MVP, and explore best practices along the way.

## Getting Started
### Backend Setup
This app pairs with a Rails API backend, [note_taker_api](https://github.com/jchirch/note_taker_api). 
To start the Rails server, run `rails server` and ensure the API runs on `http://localhost:3000/`.

### Development server

To start the Angular development server, run `ng serve`, open browser, and navigate to `http://localhost:4200/`.
The application will automatically reload whenever any source files are modified.

## Features
- View all notecards
- Create new note
- Delete note
- Dashboard with real-time database updates

## Future Features
- Show single note
- Update/Edit a note
- e2e testing with Cypress
- Unit testing with Karma || Jasmine

## Screenshots



## Accessibility
- Scored 100% using Lighthouse accessibility audit!
- Fully tabbable interface
- Descriptive class names and HTML element tags for screen readers
- Good color contrast in styling

## Tech 
- Angular 19.2.1
- Cypress 3.0.0
