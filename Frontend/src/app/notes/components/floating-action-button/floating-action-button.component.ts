import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {AddNoteDialogComponent} from '../add-note-dialog/add-note-dialog.component';
import {NgIf} from '@angular/common';
import {NotesEntity} from '../../model/notes.entity';

@Component({
  selector: 'app-floating-action-button',
  imports: [
    AddNoteDialogComponent,

  ],
  templateUrl: './floating-action-button.component.html',
  styleUrl: './floating-action-button.component.css'
})
export class FloatingActionButtonComponent {
  @Output() noteAdded = new EventEmitter<NotesEntity>();
  @ViewChild(AddNoteDialogComponent) addNoteDialog!: AddNoteDialogComponent;

  openNoteModal(): void {
    console.log('Opening Note Modal from Floating Action Button');
    this.addNoteDialog.openModal();
  }

  closeNoteModal(): void {
    console.log('Closing Note Modal from Floating Action Button');
    this.addNoteDialog.closeModal();
  }

  handleNoteAdded(note: NotesEntity): void {
    this.noteAdded.emit(note);
    this.closeNoteModal();
  }
}
