import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-note-dialog',
  imports: [
    FormsModule
  ],
  templateUrl: './add-note-dialog.component.html',
  styleUrl: './add-note-dialog.component.css'
})
export class AddNoteDialogComponent {
  @Output() close = new EventEmitter<void>();

  onCancel(): void {
    this.close.emit();
  }

  onSubmit(): void {

    this.close.emit();
  }
}
