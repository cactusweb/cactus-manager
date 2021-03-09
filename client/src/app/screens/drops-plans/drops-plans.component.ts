import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drops-plans',
  templateUrl: './drops-plans.component.html',
  styleUrls: ['./drops-plans.component.scss']
})
export class DropsPlansComponent implements OnInit {
  plans: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
