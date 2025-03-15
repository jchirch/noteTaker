import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteListComponent } from './note-list/note-list.component'
import { NoteCreateComponent } from './note-create/note-create.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // Redirect root to /dashboard
  { path: 'dashboard', component: DashboardComponent }, // Dashboard route
  { path: 'dashboard/notes', component: NoteListComponent }, // All notes route
  { path: 'dashboard/new', component: NoteCreateComponent }, // Create note route
  { path: 'dashboard/subject/:id', component: NoteListComponent }, // Subject notes route
];

// export const routes: Routes = [
//   { path: '', component: LandingComponent }, //default route
//   { path: 'dashboard', component: DashboardComponent, //parent
//     children: [                                           
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // all pathes after parent. LH4200/dashboard/....
//       { path: 'notes', component: NoteListComponent },
//       { path: 'subject/:id', component: NoteListComponent },
//       { path: 'new', component: NoteCreateComponent }
//     ]
//   }
// ];
