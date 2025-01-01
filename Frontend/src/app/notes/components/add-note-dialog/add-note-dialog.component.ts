import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NotesEntity} from '../../model/notes.entity';
import {NotesService} from '../../services/notes.service';
import {CategoriesService} from '../../services/categories.service';
import {CategoriesEntity} from '../../model/categories.entity';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-note-dialog',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './add-note-dialog.component.html',
  styleUrl: './add-note-dialog.component.css'
})
export class AddNoteDialogComponent  implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() noteAdded = new EventEmitter<NotesEntity>();

  noteTitle: string = '';
  noteContent: string = '';
  categories: CategoriesEntity[] = [];
  selectedCategories: CategoriesEntity[] = [];
  isOpen: boolean = false;
  dropdownOpen: boolean = false;

  constructor(
    private notesService: NotesService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories: CategoriesEntity[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error loading categories', error);
      }
    });
  }

  openModal(): void {
    console.log('Opening Add Note Dialog');
    this.isOpen = true;
  }

  closeModal(): void {
    console.log('Closing Add Note Dialog');
    this.isOpen = false;
    this.resetForm();
  }

  saveNote(): void {
    if (this.noteTitle.trim() && this.noteContent.trim()) {
      const newNote = new NotesEntity({
        title: this.noteTitle,
        content: this.noteContent,
        archived: false,
        categories: this.selectedCategories
      });

      this.notesService.create(newNote).subscribe({
        next: (createdNote: NotesEntity) => {
          this.noteAdded.emit(createdNote);
          this.closeModal();
        },
        error: (error: any) => {
          console.error('Error creating note', error);
        }
      });
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  updateSelectedCategories(): void {
    this.selectedCategories = this.categories.filter(category => category.selected);
  }

  private resetForm(): void {
    this.noteTitle = '';
    this.noteContent = '';
    this.selectedCategories = [];
    this.dropdownOpen = false;
  }
}
