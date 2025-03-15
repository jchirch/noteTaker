// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  notesCount: number | null = null; 
  subjectsCount: number | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchCounts();
  }

  fetchCounts(): void {
    this.dashboardService.getNotesCount().subscribe({
      next: (response) => (this.notesCount = response.count),
      error: (error) => console.error('Error fetching notes count:', error),
    });

    this.dashboardService.getSubjectsCount().subscribe({
      next: (response) => (this.subjectsCount = response.count),
      error: (error) => console.error('Error fetching subjects count:', error),
    });
  }
}