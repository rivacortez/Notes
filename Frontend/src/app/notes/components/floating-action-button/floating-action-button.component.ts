import { Component } from '@angular/core';
import {AddNoteDialogComponent} from '../add-note-dialog/add-note-dialog.component';
import {NgIf} from '@angular/common';

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

  onFabClick(): void {
    this.showAddNoteDialog = true;
  }

  onDialogClose(): void {
    this.showAddNoteDialog = false;
  }
}
