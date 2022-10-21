import { Component, OnInit } from '@angular/core';
import { MessageLogService } from '../message-log.service';

@Component({
  selector: 'app-message-log',
  templateUrl: './message-log.component.html',
  styleUrls: ['./message-log.component.scss']
})
export class MessageLogComponent implements OnInit {

  constructor(public messageLogService: MessageLogService) { }
  
  ngOnInit(): void {
  }
}
