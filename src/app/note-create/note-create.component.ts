import { Component } from '@angular/core'; // define angular componenet
import { FormBuilder, FormGroup, Validators } from '@angular/forms' // reactive froms
import { ReactiveFormsModule } from '@angular/forms'; // reactive forms vs template form
import { Router } from '@angular/router'; //router
import { CommonModule } from '@angular/common'; // directives ngIf/ngFor
import { NoteService } from '../services/note.service'; // my premade service to inject Notes content into componenet
 

@Component({
  standalone: true,
  selector: 'app-note-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-create.component.html',
  styleUrl: './note-create.component.css'
})
export class NoteCreateComponent {
  noteForm: FormGroup
  errorMsg: string | null = null;

  constructor( private fb: FormBuilder, private noteService: NoteService, private router: Router){
    this.noteForm = this.fb.group({
      title: [''],
      content: ['']
    })
  }

  onSubmit(): void {
    if (this.noteForm.valid) { 
      this.noteService.createNote(this.noteForm.value).subscribe({ 
        next: () => this.router.navigate(['/dashboard/notes']), 
        error: (error) => {
          console.log('Error creating new note: ', error)
          this.errorMsg = 'Failure creating new note.'
        }
      })
    }
  }
}