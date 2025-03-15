import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})

export class DashboardService {
  private apiUrl = 'http://localhost:3000/api/v1'; 
  constructor(private http: HttpClient) {}

  getNotesCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/notes/count`);
  }

  getSubjectsCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/subjects/count`);
  }
}