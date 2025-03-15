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
      <!-- <div class="spacer">
      </div> -->
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


// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   standalone: true,
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'note-taker';
// }
