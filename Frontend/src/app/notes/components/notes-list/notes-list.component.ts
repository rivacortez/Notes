import {Component, Input, OnInit} from '@angular/core';
import {NotesEntity} from '../../model/notes.entity';
import {NotesService} from '../../services/notes.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoriesEntity} from '../../model/categories.entity';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-notes-list',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent  implements OnInit {
  @Input() notes: NotesEntity[] = [];
  categories: CategoriesEntity[] = [];
  showAddCategoryDialog = false;
  showAddNoteDialog = false;
  newNote: NotesEntity = new NotesEntity();
  newCategory: CategoriesEntity = new CategoriesEntity();

  constructor(private notesService: NotesService, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadNotes();
    this.loadCategories();
  }

  loadNotes(): void {
    this.notesService.getAll().subscribe({
      next: (notes: NotesEntity[]) => {
        this.notes = notes.filter(note => !note.archived);
      },
      error: (error: any) => {
        console.error('Error loading notes:', error);
      }
    });
  }

  loadCategories(): void {
    this.categoriesService.categories$.subscribe({
      next: (categories: CategoriesEntity[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
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
      next: () => {
        this.loadNotes();
      },
      error: (error: any) => {
        console.error('Error archiving note:', error);
      }
    });
  }
}
