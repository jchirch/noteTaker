import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteListComponent } from './note-list/note-list.component'
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteShowComponent } from './note-show/note-show.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // root is landingpage
  { path: 'dashboard', component: DashboardComponent }, // Dashboard route
  { path: 'dashboard/notes', component: NoteListComponent }, // All notes route
  { path: 'dashboard/notes/:id', component: NoteShowComponent }, // show 1 note route
  { path: 'dashboard/new', component: NoteCreateComponent }, // Create note route
  { path: 'dashboard/subject/:id', component: NoteListComponent }, // notes by subject route
];