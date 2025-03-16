import { Injectable } from '@angular/core'; //marks class as service
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ // service availible globally
  providedIn: 'root', 
})

export class DashboardService {
  private apiUrl = 'http://localhost:3000/api/v1'; // switch out url when deployed
  constructor(private http: HttpClient) {} //injects http client so service can mke http requests

  getNotesCount(): Observable<{ count: number }> { //function return an observable object
    return this.http.get<{ count: number }>(`${this.apiUrl}/notes/count`); // returns {count: ###} from apiURL route request
  }

  getSubjectsCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/subjects/count`);
  }
}