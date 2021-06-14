import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.scss']
})
export class LicenseInfoComponent implements OnInit {
  @Input() license: any;

  @Output() onClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  copyData( data ){
    navigator.clipboard.writeText(data)
  }

}
