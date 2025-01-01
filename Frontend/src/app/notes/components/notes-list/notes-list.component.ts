import {Component, Input, OnInit} from '@angular/core';
import {NotesEntity} from '../../model/notes.entity';
import {NotesService} from '../../services/notes.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoriesEntity} from '../../model/categories.entity';

@Component({
  selector: 'app-notes-list',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent implements OnInit {
  @Input() notes: NotesEntity[] = [];
  showAddCategoryDialog = false;
  showAddNoteDialog = false;
  newNote: NotesEntity = new NotesEntity();
  newCategory: CategoriesEntity = new CategoriesEntity();

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getAll().subscribe({
      next: (notes: NotesEntity[]) => {
        this.notes = notes;
      },
      error: (error: any) => {
        console.error('Error loading notes:', error);
      }
    });
  }

  openAddNoteDialog(): void {
    this.showAddNoteDialog = true;
  }

  closeAddNoteDialog(): void {
    this.showAddNoteDialog = false;
  }

  saveNote(): void {
    this.notesService.create(this.newNote).subscribe({
      next: (createdNote: NotesEntity) => {
        this.notes.push(createdNote);
        this.closeAddNoteDialog();
      },
      error: (error: any) => {
        console.error('Error creating note:', error);
      }
    });
  }

  openAddCategoryDialog(): void {
    this.showAddCategoryDialog = true;
  }

  closeAddCategoryDialog(): void {
    this.showAddCategoryDialog = false;
  }

  saveCategory(): void {
    // Implement save category
  }

  editNote(note: NotesEntity): void {
    // Implement edit
  }

  deleteNote(note: NotesEntity): void {
    this.notesService.delete(note.id).subscribe({
      next: () => {
        this.notes = this.notes.filter(n => n.id !== note.id);
      },
      error: (error: any) => {
        console.error('Error deleting note:', error);
      }
    });
  }

  archiveNote(note: NotesEntity): void {
    note.archived = true;
    this.notesService.updateNote(note.id, note).subscribe({
      next: (updatedNote: NotesEntity) => {
        const index = this.notes.findIndex(n => n.id === updatedNote.id);
        if (index !== -1) {
          this.notes[index] = updatedNote;
        }
      },
      error: (error: any) => {
        console.error('Error archiving note:', error);
      }
    });
  }
}
