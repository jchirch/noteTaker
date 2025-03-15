import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule], // import RouterModule
  selector: 'app-root',
  template: `
    <header>
      <div class="logo-container">
        <h1 class="header">Note</h1>
        <h1 class="header">Taker</h1>
      </div>
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/dashboard/notes">All Notes</a>
        <a routerLink="/dashboard/new">Create Note</a>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
