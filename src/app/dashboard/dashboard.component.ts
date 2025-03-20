import { Component, OnInit } from '@angular/core'; // angular features to define components/hook runs when componenet initialized
import { RouterModule, Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service'; // service handles api calls for notes/subjects
import { CommonModule } from '@angular/common'; // directives ngIf/ngFor

@Component({
  standalone: true, //doesnt rely on external module, own dependencies
  imports: [RouterModule, CommonModule],
  selector: 'app-dashboard', 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  notesCount: number | null = null; 
  subjectsCount: number | null = null;
  errorMessage: string | null = null;

  //dependency injection!
  constructor(private router: Router, private dashboardService: DashboardService) {} //injects dashboard service and its helper methods

  ngOnInit(): void { //upon initialization, invoke fetchcounts()
    this.fetchCounts();
  }

  navigateToAllNotes(){
    this.router.navigate(['/dashboard/notes'])
  }

  navigateToCreateNote(){
    this.router.navigate(['/dashboard/new'])
  }

  fetchCounts(): void {
    this.dashboardService.getNotesCount().subscribe({ //calls on instance of service to inject functions. 
    // returns an observable. subscribe called on observble class to get data
      next: (response) => (this.notesCount = response.count), // if successful, updates rendered count w/ response count
      error: (error) => { //if fails, responds w/ messages for user and dev empathy
        console.error('Error fetching notes count:', error),
        this.errorMessage = 'Failure loading note count.'
      },
    });

    this.dashboardService.getSubjectsCount().subscribe({
      next: (response) => (this.subjectsCount = response.count),
      error: (error) => {
        console.error('Error fetching subjects count:', error),
        this.errorMessage = 'Failure loading subject count.'
      },
    });
  }
}