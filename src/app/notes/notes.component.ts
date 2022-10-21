import { Component, OnInit } from '@angular/core';
import { MessageLogService } from '../message-log.service';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { NOTES } from '../notes-list';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];

  constructor(private noteService: NoteService, private messageLogService: MessageLogService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }
  
  add(title: string, body: string): void {
  this.noteService.addNote({ title, body } as Note)
    .subscribe(note => {this.notes.push(note)});
  }
}
