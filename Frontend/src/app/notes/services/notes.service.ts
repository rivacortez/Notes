import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotesEntity } from '../model/notes.entity';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends BaseService<NotesEntity> {
  protected override resourceEndpoint = '/notes';

  override create(note: NotesEntity): Observable<NotesEntity> {
    return this.http.post<NotesEntity>(this.resourcePath(), note, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateNote(id: number, note: NotesEntity): Observable<NotesEntity> {
    return this.http.put<NotesEntity>(`${this.resourcePath()}/${id}`, note, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  override getAll(): Observable<NotesEntity[]> {
    return this.http.get<NotesEntity[]>(this.resourcePath())
      .pipe(retry(2), catchError(this.handleError));
  }

  public override delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
