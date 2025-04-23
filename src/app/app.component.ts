import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule], // import RouterModule
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

constructor(private router: Router) {}

  returnToHome(): void {
    this.router.navigate(['/'])
  }
}
