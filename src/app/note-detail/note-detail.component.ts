import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  @Input() note?: Note;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNoteId();
  }

  getNoteId(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noteService.getNote(id)
      .subscribe(note => this.note = note);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.note) {
      this.noteService.updateNote(this.note)
        .subscribe(() => this.goBack());
    }
  }

}
