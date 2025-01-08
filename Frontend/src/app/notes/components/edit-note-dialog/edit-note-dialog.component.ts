import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotesEntity } from '../../model/notes.entity';
import { CategoriesEntity } from '../../model/categories.entity';
import { NotesService } from '../../services/notes.service';
import { CategoriesService } from '../../services/categories.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-note-dialog',
  imports: [
    NgIf,
    NgClass,
    FormsModule,
    NgForOf
  ],
  templateUrl: './edit-note-dialog.component.html',
  styleUrl: './edit-note-dialog.component.css'
})
export class EditNoteDialogComponent implements OnInit {
  @Input() note: NotesEntity = new NotesEntity();
  @Output() close = new EventEmitter<void>();
  @Output() noteUpdated = new EventEmitter<NotesEntity>();

  categories: CategoriesEntity[] = [];
  isOpen: boolean = false;

  constructor(
    private notesService: NotesService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe({
      next: (categories: CategoriesEntity[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  openModal(note: NotesEntity): void {
    this.note = { ...note };
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
  }

  saveNote(): void {
    this.notesService.update(this.note.id, this.note).subscribe({
      next: (updatedNote: NotesEntity) => {
        this.noteUpdated.emit(updatedNote);
        this.closeModal();
      },
      error: (error: any) => {
        console.error('Error updating note:', error);
      }
    });
  }
}
