import { Component, OnInit } from '@angular/core';
import { MessageLogService } from '../message-log.service';
import { Note } from '../note';
import { NoteService } from '../note.service';

import { NOTES } from '../notes-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  notes: Note[] = [];

  constructor(private messageLogService: MessageLogService, private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
    this.messageLogService.add('Fetched favourite notes');
  }

  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(n => this.notes = n.slice(0, 3))
  }
}
