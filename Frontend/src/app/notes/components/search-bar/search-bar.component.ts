import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesEntity } from '../../model/categories.entity';
import { CategoriesService } from '../../services/categories.service';
import {AddCategoryDialogComponent} from '../add-category-dialog/add-category-dialog.component';
import {NotesService} from '../../services/notes.service';
import {NotesEntity} from '../../model/notes.entity';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    AddCategoryDialogComponent
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})



export class SearchBarComponent implements OnInit {
  @ViewChild(AddCategoryDialogComponent) addCategoryDialog!: AddCategoryDialogComponent;
  @Output() notesFiltered = new EventEmitter<NotesEntity[]>();
  @Output() categoryAdded = new EventEmitter<CategoriesEntity>();
  @Output() categoryAddedEvent = new EventEmitter<CategoriesEntity>();


  categories: CategoriesEntity[] = [];
  selectedCategory: CategoriesEntity | null = null;
  searchQuery: string = '';
  showAddCategoryDialog: boolean = false;
  archiveButtonText: string = 'Archived';

  constructor(
    private categoriesService: CategoriesService,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    this.categoriesService.categories$.subscribe({
      next: (categories: CategoriesEntity[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
      }
    });
    this.categoriesService.loadCategories();
    this.filterNotes();
  }

  updateArchiveButtonText(): void {
    this.archiveButtonText = this.archiveButtonText === 'Archived' ? 'Unarchived' : 'Archived';
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.toLowerCase();
    this.filterNotes();
  }

  selectCategory(category: CategoriesEntity | null): void {
    this.selectedCategory = category;
    this.filterNotes();
  }

  filterNotes(): void {
    this.notesService.getAll().subscribe({
      next: (notes: NotesEntity[]) => {
        let filteredNotes = notes;
        if (this.selectedCategory) {
          filteredNotes = filteredNotes.filter(note => note.idCategories.includes(this.selectedCategory!.id));
        }
        if (this.searchQuery) {
          filteredNotes = filteredNotes.filter(note => note.title.toLowerCase().includes(this.searchQuery) || note.content.toLowerCase().includes(this.searchQuery));
        }
        if (this.archiveButtonText === 'Archived') {
          filteredNotes = filteredNotes.filter(note => !note.archived);
        } else {
          filteredNotes = filteredNotes.filter(note => note.archived);
        }
        this.notesFiltered.emit(filteredNotes);
      },
      error: (error: any) => {
        console.error('Error filtering notes:', error);
      }
    });
  }

  openCategoryModal(): void {
    console.log('Opening Category Modal from Search Bar');
    this.addCategoryDialog.openModal();
  }

  closeCategoryModal(): void {
    console.log('Closing Category Modal from Search Bar');
    this.addCategoryDialog.closeModal();
  }

  handleCategoryAdded(newCategory: CategoriesEntity): void {
    if (!this.categories.some(category => category.id === newCategory.id)) {
      this.categories.push(newCategory);
    }
  }

  deleteCategory(categoryId: number): void {
    this.categoriesService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.categories = this.categories.filter(category => category.id !== categoryId);
      },
      error: (error: any) => {
        console.error('Error deleting category:', error);
      }
    });
  }

  toggleArchive(): void {
    this.archiveButtonText = this.archiveButtonText === 'Archived' ? 'Unarchived' : 'Archived';
    this.filterNotes();
  }

  onDialogClose(): void {
    this.closeCategoryModal();
  }

  onCategoryAdded(newCategory: CategoriesEntity): void {
    if (!this.categories.some(category => category.id === newCategory.id)) {
      this.categories.push(newCategory);
    }
  }
}
