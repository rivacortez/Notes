import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CategoriesEntity} from '../../model/categories.entity';
import {NgIf} from '@angular/common';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-add-category-dialog',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css'
})
export class AddCategoryDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() categoryAdded = new EventEmitter<CategoriesEntity>();

  categoryName: string = '';
  categoryColor: string = '';
  isOpen: boolean = false;

  constructor(private categoriesService: CategoriesService) {}

  openModal(): void {
    console.log('Opening Add Category Dialog');
    this.isOpen = true;
  }

  closeModal(): void {
    console.log('Closing Add Category Dialog');
    this.isOpen = false;
    this.resetForm();
  }

  onCancel(): void {
    this.closeModal();
  }

  saveCategory(): void {
    if (this.categoryName.trim()) {
      const newCategory = new CategoriesEntity({ name: this.categoryName, color: this.categoryColor });
      this.categoriesService.createCategory(newCategory).subscribe({
        next: (createdCategory: CategoriesEntity) => {
          this.categoryAdded.emit(createdCategory);
          this.closeModal();
        },
        error: (error: any) => {
          console.error('Error creating category:', error);
        }
      });
    }
  }

  private resetForm(): void {
    this.categoryName = '';
    this.categoryColor = '';
  }
}
