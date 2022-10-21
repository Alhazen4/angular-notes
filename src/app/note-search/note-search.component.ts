import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-search',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.scss']
})
export class NoteSearchComponent implements OnInit {

  componentNotes$!: Observable<Note[]>;
  private searchTerms = new Subject<string>();

  constructor(private noteService: NoteService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.componentNotes$ = this.searchTerms.pipe(
      // debounceTime(300),
      // distinctUntilChanged(),
      switchMap((term: string) => this.noteService.searchNotes(term)),
    );
  }
}
