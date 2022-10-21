import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notes = [
      {id: 1, title: "Keuangan", body:'dwqiweqwdnewncuiew'},
      {id: 2, title: "Catatan Harian", body:'qweasdzxcdqwewcwc'},
      {id: 3, title: "Utang-Piutang", body:'kjntyknmgjbtkmrtb'},
      {id: 4, title: "Apa Aja", body:'pplnfejfnrevjjrvnrj'},
      {id: 5, title: "List Belanja", body:',, ncfjvrekidnvireji'}
    ];
    return {notes};
  }

  genId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 11;
  }
}
