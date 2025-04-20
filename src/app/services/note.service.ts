import { Injectable } from '@angular/core'; // allows class to be injected
import { HttpClient } from '@angular/common/http'; // allows us to make http requests
import { Observable } from 'rxjs'; // works with async data, like http responses

export interface Note { // interface defines structure of an object (Note). like a serializer?
  // lets typescript know the strucutr and datatype of a Note object
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

@Injectable({ // ensures service is global (root)
  providedIn: 'root'
})

export class NoteService {

  private apiUrl = 'http://localhost:3000/api/v1'; // switch out url when deployed
  constructor(private http: HttpClient) { } //injects http client so service can mke http requests

  getAllNotes(): Observable<Note[]> { //function return an observable object
    return this.http.get<Note[]>(`${this.apiUrl}/notes`); // returns {count: ###} from apiURL route request
  }

  showNote(noteId: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/notes/${noteId}`)
  }

  createNote(newNote: Note): Observable<Note> { //newNote follows note interface as a templete
    return this.http.post<Note>(`${this.apiUrl}/notes`, newNote);
  }

  deleteNote(noteId: number): Observable<void> { 
    return this.http.delete<void>(`${this.apiUrl}/notes/${noteId}`); //calls on observable, http action, delete, then the route
  }

  // takes a newNote object that matches Note interface
  // sends post request to api url with newNote as request body
  // returns observable from result of api response
}
