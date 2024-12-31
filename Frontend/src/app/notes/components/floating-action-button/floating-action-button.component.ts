import {Component, EventEmitter, Output} from '@angular/core';
import {AddNoteDialogComponent} from '../add-note-dialog/add-note-dialog.component';
import {NgIf} from '@angular/common';
import {NotesEntity} from '../../model/notes.entity';

@Component({
  selector: 'app-floating-action-button',
  imports: [
    AddNoteDialogComponent,
    NgIf
  ],
  templateUrl: './floating-action-button.component.html',
  styleUrl: './floating-action-button.component.css'
})
export class FloatingActionButtonComponent {
  showAddNoteDialog = false;
  @Output() noteAdded = new EventEmitter<NotesEntity>();

  onFabClick(): void {
    this.showAddNoteDialog = true;
  }

  onDialogClose(): void {
    this.showAddNoteDialog = false;
  }

  onNoteAdded(note: NotesEntity): void {
    this.noteAdded.emit(note);
    this.showAddNoteDialog = false;
  }
}
