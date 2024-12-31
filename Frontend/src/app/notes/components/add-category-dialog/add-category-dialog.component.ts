import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CategoriesEntity} from '../../model/categories.entity';

@Component({
  selector: 'app-add-category-dialog',
  imports: [
    FormsModule
  ],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css'
})
export class AddCategoryDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() categoryAdded = new EventEmitter<CategoriesEntity>();

  categoryName: string = '';
  categoryColor: string = '';

  onCancel(): void {
    console.log('Cancel button clicked');
    this.close.emit();
  }

  onSubmit(): void {
    console.log('Submit button clicked');
    console.log('Category Name:', this.categoryName);
    console.log('Category Color:', this.categoryColor);

    const newCategory = new CategoriesEntity({ name: this.categoryName, color: this.categoryColor });
    console.log('New Category:', newCategory);

    this.categoryAdded.emit(newCategory);
    this.close.emit();
  }
}
