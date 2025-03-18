import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note { // interface defines structure of an object (Note). like a serializer?
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})

export class NoteService {

  private apiUrl = 'http://localhost:3000/api/v1'; // switch out url when deployed
  constructor(private http: HttpClient) { } //injects http client so service can mke http requests

  getAllNotes(): Observable<Note[]> { //function return an observable object
    return this.http.get<Note[]>(`${this.apiUrl}/notes`); // returns {count: ###} from apiURL route request
  }
}
