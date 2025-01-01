import {Component, OnInit} from '@angular/core';
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
  notes: NotesEntity[] = [];
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
        console.error('Error loading notes', error);
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
        console.error('Error creating note', error);
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
    // Implement delete
  }

  archiveNote(note: NotesEntity): void {
    // Implement archive
  }
}
