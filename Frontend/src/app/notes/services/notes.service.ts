import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import {Observable, switchMap} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotesEntity } from '../model/notes.entity';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends BaseService<NotesEntity> {

  protected override resourceEndpoint = '/notes';

  constructor(
    protected override http: HttpClient,
    private authService: AuthenticationService
  ) {
    super();
  }

  override create(note: NotesEntity): Observable<NotesEntity> {
    return this.http.post<NotesEntity>(this.resourcePath(), note, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateNote(id: number, note: NotesEntity): Observable<NotesEntity> {
    return this.http.put<NotesEntity>(`${this.resourcePath()}/${id}`, note, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  override getAll(): Observable<NotesEntity[]> {
    return this.authService.currentUserId.pipe(
      switchMap(userId => {
        return this.http.get<NotesEntity[]>(`${this.resourcePath()}?userId=${userId}`)
          .pipe(retry(2), catchError(this.handleError));
      })
    );
  }

  override delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
