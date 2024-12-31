import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CategoriesEntity } from '../model/categories.entity';
import { NotesEntity } from '../model/notes.entity';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService<CategoriesEntity> {

  protected override resourceEndpoint = '/categories';

  getAllCategories(): Observable<CategoriesEntity[]> {
    return this.http.get<CategoriesEntity[]>(this.resourcePath())
      .pipe(retry(2), catchError(this.handleError));
  }

  getCategoryById(id: number): Observable<CategoriesEntity> {
    return this.http.get<CategoriesEntity>(`${this.resourcePath()}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createCategory(category: CategoriesEntity): Observable<CategoriesEntity> {
    return this.http.post<CategoriesEntity>(this.resourcePath(), category, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateCategory(id: number, category: CategoriesEntity): Observable<CategoriesEntity> {
    return this.http.put<CategoriesEntity>(`${this.resourcePath()}/${id}`, category, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}/${id}`, this.httOptions);
  }

  getNotesOfCategory(categoryId: number): Observable<NotesEntity[]> {
    return this.http.get<NotesEntity[]>(`${this.resourcePath()}/${categoryId}/notes`)
      .pipe(retry(2), catchError(this.handleError));
  }

  associateCategoryWithNote(categoryId: number, noteId: number): Observable<void> {
    return this.http.post<void>(`${this.resourcePath()}/${categoryId}/notes/${noteId}`, {}, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  disassociateCategoryFromNote(categoryId: number, noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}/${categoryId}/notes/${noteId}`, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  archiveCategory(id: number): Observable<void> {
    return this.http.patch<void>(`${this.resourcePath()}/${id}/archive`, {}, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


}
