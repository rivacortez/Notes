import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesEntity } from '../../model/categories.entity';
import { CategoriesService } from '../../services/categories.service';
import {AddCategoryDialogComponent} from '../add-category-dialog/add-category-dialog.component';

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

  categories: CategoriesEntity[] = [];
  selectedCategory: CategoriesEntity | null = null;
  searchQuery: string = '';
  showAddCategoryDialog: boolean = false;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories: CategoriesEntity[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
    // Implement search logic
  }

  selectCategory(category: CategoriesEntity | null): void {
    this.selectedCategory = category;
    // Implement category selection
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
    this.categoriesService.createCategory(newCategory).subscribe({
      next: (createdCategory: CategoriesEntity) => {
        this.categories.push(createdCategory);
        this.closeCategoryModal();
      },
      error: (error: any) => {
        console.error('Error creating category:', error);
      }
    });
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

  onDialogClose() {
    this.closeCategoryModal();
  }

  onCategoryAdded($event: CategoriesEntity) {
    this.handleCategoryAdded($event);
  }
}
