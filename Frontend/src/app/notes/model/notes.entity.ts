import {NgIterable} from '@angular/core';
import {CategoriesEntity} from './categories.entity';


export class NotesEntity {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  categories: CategoriesEntity[];

  constructor(data: { id?: number, title?: string, content?: string, archived?: boolean, categories?: CategoriesEntity[] } = {}) {
    this.id = data.id || 0;
    this.title = data.title || '';
    this.content = data.content || '';
    this.archived = data.archived || false;
    this.categories = data.categories || [];
  }
}
