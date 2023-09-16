import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ryodan-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class RyodanLabelComponent implements OnInit {
  @Input() label: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
