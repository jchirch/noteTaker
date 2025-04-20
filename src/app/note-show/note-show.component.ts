import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NoteService, Note } from '../services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-show',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './note-show.component.html',
  styleUrl: './note-show.component.css'
})

export class NoteShowComponent {
  note: Note | undefined;
  errorMsg: string | null = null;

  constructor(private noteService: NoteService, private route: ActivatedRoute) { } // inject the NoteService
  // adding private makes it class property. Without it, can't access this.route in findNote()
  ngOnInit(): void {
    this.findNote()
  }

  findNote(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.noteService.showNote(id).subscribe({
      next: (note) => {
        this.note = note;
        this.errorMsg = null;
      },

      error: (err) => {
        this.errorMsg = 'Failed to load note.';
        console.log(this.errorMsg)
      }
    })
  }
}