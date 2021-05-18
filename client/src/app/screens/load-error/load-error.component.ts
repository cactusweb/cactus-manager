import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-load-error',
  templateUrl: './load-error.component.html',
  styleUrls: ['./load-error.component.css']
})
export class LoadErrorComponent implements OnInit {
  @Output() onRefresh = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
