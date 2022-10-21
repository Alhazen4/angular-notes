import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageLogService } from './message-log.service';
import { Note } from './note';
import { NOTES } from './notes-list';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private log(message: string) {
    this.messageLogService.add(`NoteService: ${message}`);
  }

  private notesURL = 'api/notes';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failoed: ${error.message}`);
      return of(result as T);
    }
  }

  httpOptions = { 
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesURL)
    .pipe(
      tap(_ => this.log('Fetched All Notes')),
      catchError(this.handleError<Note[]>('getHeroes', []))
    );
  }

  getNote(id: number): Observable<Note> {
    const url = `${this.notesURL}/${id}`;
    return this.http.get<Note>(url)
      .pipe(
        tap(_ => this.log(`Fetched a Note with id = ${id}`)),
        catchError(this.handleError<Note>(`getHero id = ${id}`))
      );
  }

  updateNote(note: Note): Observable<any> {
    return this.http.put(this.notesURL, note, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Note ${note.id} updated`)),
        catchError(this.handleError<any>('updateNote'))
      );
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesURL, note, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Added new Note with title ${note.title}`)),
        catchError(this.handleError<Note>('addNote'))
      );
  }

  deleteNote(note: Note): Observable<Note> {
    const url = `${this.notesURL}/${note.id}`;
    return this.http.delete<Note>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`Deleted note with title = ${note.title}`)),
      catchError(this.handleError<Note>('deleteNote'))
    );
  }

  searchNotes(term: string): Observable<Note[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Note[]>(`${this.notesURL}/?title=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`Found note "${term}"`) :
          this.log(`No Found note "${term}"`)),
        catchError(this.handleError<Note[]>('searchNotes', []))
      );
  }

  constructor(
    private messageLogService: MessageLogService,
    private http: HttpClient) { }
}