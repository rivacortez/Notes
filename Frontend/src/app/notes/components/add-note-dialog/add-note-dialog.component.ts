import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NotesEntity} from '../../model/notes.entity';
import {NotesService} from '../../services/notes.service';

@Component({
  selector: 'app-add-note-dialog',
  imports: [
    FormsModule
  ],
  templateUrl: './add-note-dialog.component.html',
  styleUrl: './add-note-dialog.component.css'
})
export class AddNoteDialogComponent{
  @Output() close = new EventEmitter<void>();
  @Output() noteAdded = new EventEmitter<NotesEntity>();

  noteTitle: string = '';
  noteContent: string = '';

  constructor(private notesService: NotesService) {}

  onCancel(): void {
    this.close.emit();
  }

  onSubmit(): void {
    const newNote = new NotesEntity({
      title: this.noteTitle,
      content: this.noteContent,
      archived: false
    });

    this.notesService.create(newNote).subscribe({
      next: (createdNote: NotesEntity) => {
        this.noteAdded.emit(createdNote);
        this.close.emit();
      },
      error: (error: any) => {
        console.error('Error creating note', error);
      }
    });
  }
}
