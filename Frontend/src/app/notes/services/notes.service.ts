import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {NotesEntity} from '../model/notes.entity';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends BaseService<NotesEntity> {

  protected override resourceEndpoint = '/notes';


  override create(note: NotesEntity): Observable<NotesEntity> {
    return this.http.post<NotesEntity>(this.resourcePath(), note, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  associateNoteWithCategory(noteId: number, categoryId: number): Observable<void> {
    return this.http.post<void>(`${this.basePath}${this.resourceEndpoint}/${noteId}/categories/${categoryId}`, {}, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  disassociateNoteFromCategory(noteId: number, categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}${this.resourceEndpoint}/${noteId}/categories/${categoryId}`, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  archiveNote(id: number): Observable<void> {
    return this.http.patch<void>(`${this.basePath}${this.resourceEndpoint}/${id}/archive`, {}, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  override getAll(): Observable<NotesEntity[]> {
    return this.http.get<NotesEntity[]>(this.resourcePath())
      .pipe(retry(2), catchError(this.handleError));
  }
}
