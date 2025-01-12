import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NotesEntity} from '../../model/notes.entity';
import {NotesService} from '../../services/notes.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoriesEntity} from '../../model/categories.entity';
import {CategoriesService} from '../../services/categories.service';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import {SearchBarComponent} from '../search-bar/search-bar.component';

@Component({
  selector: 'app-notes-list',
  imports: [
    NgForOf,
    FormsModule,
    EditNoteDialogComponent,
    NgIf
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent  implements OnInit {
  @ViewChild(EditNoteDialogComponent) editNoteDialog!: EditNoteDialogComponent;
  @Input() searchBarComponent!: SearchBarComponent;
  @Input() notes: NotesEntity[] = [];
  categories: CategoriesEntity[] = [];
  @Output() notesUpdated = new EventEmitter<void>();

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
        this.notes = notes;
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

  editNote(note: NotesEntity): void {
    this.editNoteDialog.openModal(note);
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
    note.archived = !note.archived;
    this.notesService.update(note.id, note).subscribe({
      next: () => {
        this.notesUpdated.emit();
      },
      error: (error: any) => {
        console.error('Error archiving note:', error);
      }
    });
  }

  onNoteUpdated(updatedNote: NotesEntity): void {
    const index = this.notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
    }
  }

  onCategoryAdded(newCategory: CategoriesEntity): void {
    this.categories.push(newCategory);
  }
}
