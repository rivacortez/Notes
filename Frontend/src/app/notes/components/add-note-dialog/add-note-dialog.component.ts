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
    this.categoriesService.categories$.subscribe({
      next: (categories: CategoriesEntity[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
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
  }

  saveNote(): void {
    if (this.noteTitle.trim() && this.noteContent.trim()) {
      const newNote = new NotesEntity({
        title: this.noteTitle,
        content: this.noteContent,
        archived: false,
        idCategories: this.selectedCategories.map(category => category.id)
      });

      this.notesService.create(newNote).subscribe({
        next: (createdNote: NotesEntity) => {
          this.noteAdded.emit(createdNote);
          this.closeModal();
        },
        error: (error: any) => {
          console.error('Error creating note:', error);
        }
      });
    }
  }

  selectCategory(category: CategoriesEntity): void {
    const index = this.selectedCategories.findIndex(cat => cat.id === category.id);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategories = Array.from(selectElement.selectedOptions).map(option => {
      return this.categories.find(category => category.id === +option.value)!;
    });
  }
}
