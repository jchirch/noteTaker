import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteListComponent } from './note-list/note-list.component'
import { NoteCreateComponent } from './note-create/note-create.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, //default route
  { path: 'dashboard', component: DashboardComponent, //parent
    children: [                                           
      { path: '', redirectTo: 'all', pathMatch: 'full' }, // all pathes after parent. LH4200/dashboard/....
      { path: 'all', component: NoteListComponent },
      { path: 'subject/:id', component: NoteListComponent },
      { path: 'new', component: NoteCreateComponent }
    ]
  }
];
