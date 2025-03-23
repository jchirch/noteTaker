import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoteService, Note } from '../services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-note-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  errorMessage: string | null = null;

  constructor(private noteService: NoteService) {} // inject the NoteService

  ngOnInit(): void {
    this.fetchNotes(); //when the component initializes, fetch all notes
  }

  deleteNote(noteId: number): void {
    this.noteService.deleteNote(noteId).subscribe({
      next: () => {
        this.notes = this.notes.filter(note => note.id !== noteId);  // Remove the note from the list
        alert('Note deleted successfully');  // Optional alert after deletion
      },
      error: (err) => {
        console.error('Failed to delete the note:', err);  // Log the error to the console
        alert('Failed to delete the note');  // Optional error alert
      }
    });
  }

  fetchNotes(): void {
    this.noteService.getAllNotes().subscribe({//calls on instance of Note service to inject functions. 
    // returns an observable. subscribe called on observble class to get data
      next: (notes) => (this.notes = notes), // Update the notes array
      error: (error) => {
        console.error('Error fetching notes:', error);
        this.errorMessage = 'Failed to load notes.';
      },
    });
  }
}
