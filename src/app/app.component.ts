import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule], // Import RouterModule
  selector: 'app-root',
  template: `
    <header>
      <h1>Note Taker</h1>
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/dashboard">Dashboard</a>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}


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
