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
export class AddCategoryDialogComponent{
  @Output() close = new EventEmitter<void>();
  @Output() categoryAdded = new EventEmitter<CategoriesEntity>();

  categoryName: string = '';
  categoryColor: string = '';

  onCancel(): void {
    this.close.emit();
  }

  onSubmit(): void {
    const newCategory = new CategoriesEntity({ name: this.categoryName, color: this.categoryColor });
    this.categoryAdded.emit(newCategory);
    this.close.emit();
  }
}
