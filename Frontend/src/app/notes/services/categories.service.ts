import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CategoriesEntity } from '../model/categories.entity';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService<CategoriesEntity> {

  protected override resourceEndpoint = '/categories';

  associateCategoryWithNote(categoryId: number, noteId: number): Observable<void> {
    return this.http.post<void>(`${this.basePath}${this.resourceEndpoint}/${categoryId}/notes/${noteId}`, {}, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  disassociateCategoryFromNote(categoryId: number, noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}${this.resourceEndpoint}/${categoryId}/notes/${noteId}`, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  archiveCategory(id: number): Observable<void> {
    return this.http.patch<void>(`${this.basePath}${this.resourceEndpoint}/${id}/archive`, {}, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
