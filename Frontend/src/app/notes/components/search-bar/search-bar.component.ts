import { Component, OnInit } from '@angular/core';
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
    NgIf,
    AddCategoryDialogComponent
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent  implements OnInit {
  categories: CategoriesEntity[] = [];
  selectedCategory: string = 'Todas';
  searchQuery: string = '';
  showAddCategoryDialog = false;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories: CategoriesEntity[]) => {
        this.categories = categories;
        this.categories.forEach(category => {
          console.log(`Category ID: ${category.id}, Name: ${category.name}, Color: ${category.color}`);
        });
      },
      error: (error: any) => {
        console.error('Error loading categories', error);
      }
    });
  }
  onCategorySelect(category: string): void {
    this.selectedCategory = category;
  }

  onSearchInput(): void {
  }

  onAddCategoryClick(): void {
    this.showAddCategoryDialog = true;
  }

  onDialogClose(): void {
    this.showAddCategoryDialog = false;
  }

  onCategoryAdded(newCategory: CategoriesEntity): void {
    this.categoriesService.createCategory(newCategory).subscribe({
      next: (createdCategory: CategoriesEntity) => {
        this.categories.push(createdCategory);
        this.showAddCategoryDialog = false;
      },
      error: (error: any) => {
        console.error('Error creating category', error);
      }
    });
  }

  onCategoryDelete(categoryName: string, event: Event): void {
    event.stopPropagation();
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category && category.id !== undefined && category.id !== null) {
      console.log(`Category ID to delete: ${category.id}`);
      this.categoriesService.deleteCategory(category.id).subscribe({
        next: () => {
          console.log('Category deleted successfully');
          this.categories = this.categories.filter(cat => cat.id !== category.id);
        },
        error: (error: any) => {
          console.error('Error deleting category', error);
        }
      });
    } else {
      console.error('Category ID is undefined for category:', categoryName);
    }
  }
}
