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
    <footer>
      <p>Created by Joe Chirchirillo</p>
      <a href="https://www.linkedin.com/in/joechirchirillo/" target="_blank">LinkedIn</a>
      <a href="https://github.com/joechirchirillo" target="_blank">GitHub</a>
      <a href="https://github.com/jchirch/noteTaker" target="_blank">App Repo</a>
    </footer> 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
