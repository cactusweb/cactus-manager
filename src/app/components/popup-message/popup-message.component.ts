import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss']
})
export class PopupMessageComponent implements OnInit {
  @Input() message: string = 'Smth went wrong';
  @Input() isError: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
