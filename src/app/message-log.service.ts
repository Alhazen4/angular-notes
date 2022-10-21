import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageLogService {

  messagesLog: string[] = [];

  add(messageLog: string) {
    this.messagesLog.push(messageLog);
  }

  clear() {
    this.messagesLog = [];
  }

  constructor() { }
}
