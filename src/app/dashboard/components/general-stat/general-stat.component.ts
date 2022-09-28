import { Component, Input, OnInit } from '@angular/core';
import { Stats } from '../../interfaces/stats';

@Component({
  selector: 'app-general-stat',
  templateUrl: './general-stat.component.html',
  styleUrls: ['./general-stat.component.scss']
})
export class GeneralStatComponent implements OnInit {
  @Input() stats!: Stats;

  constructor() { }

  ngOnInit(): void {
  }

}
